"use server";

import { sql } from "@/app/lib/db"; // must return { rows: T[] }
import bcrypt from "bcrypt"; // or see note below for bcryptjs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VERIFY_EMAIL_COOKIE_PATH } from "../verify/lib/helper";
import {
  ForgotPasswordSchema,
  type ForgotPasswordState,
  ResetPasswordSchema,
  type ResetPasswordState,
  SignupStep1Schema,
  type SignupStep1State,
} from "./schema";
import { issueVerificationCode } from "./verification";

/**
 * Forgot password – step 1:
 * - Validate email
 * - If user exists, set verify cookies + send code
 * - Always return same message (do not reveal if email exists)
 * - Tell client to redirect to /u/verify
 */
export const forgotPassword = async (
  _prevState: ForgotPasswordState | undefined,
  formData: FormData
): Promise<ForgotPasswordState> => {
  const rawEmail = String(formData.get("email") ?? "");

  // 1) Validate input
  const parsed = ForgotPasswordSchema.safeParse({ email: rawEmail });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please correct the errors below.",
      errors: fe as ForgotPasswordState["errors"],
      data: { email: rawEmail },
    };
  }

  const { email } = parsed.data;

  try {
    // 2) Check if the user exists (do NOT reveal result to client)
    const rows = await sql<{ id: number }[]>`
      SELECT id
      FROM users
      WHERE lower(email) = lower(${email})
      LIMIT 1;
    `;

    if (rows.length > 0) {
      const userId = Number(rows[0].id);

      // 3) Set short-lived verify cookies (similar to signupStep1)
      const cookieStore = await cookies();
      const maxAge = 10 * 60; // 10 minutes

      cookieStore.set("verify_uid", String(userId), {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: VERIFY_EMAIL_COOKIE_PATH,
        maxAge,
      });

      cookieStore.set("verify_email", email, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: VERIFY_EMAIL_COOKIE_PATH,
        maxAge,
      });

      // mark this verification as coming from "reset password" flow
      cookieStore.set("verify_mode", "reset", {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: VERIFY_EMAIL_COOKIE_PATH,
        maxAge,
      });

      // 4) Send a verification code email (reuses your existing logic)
      await issueVerificationCode({ userId, email });
    }

    // 5) Always return the SAME message (don’t leak if email exists)
    return {
      ok: true,
      message:
        "If this email exists in our system, a verification code has been sent.",
      requiresVerification: true,
      redirectTo: "/u/verify",
      data: { email },
    };
  } catch (err) {
    console.error("forgotPassword error:", err);
    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
      data: { email },
    };
  }
};

/**
 * Step 1 of signup: validate email/password, ensure email is free,
 * create the user with a hashed password, send verification code.
 */
export async function signupStep1(
  _prevState: SignupStep1State | undefined,
  formData: FormData
): Promise<SignupStep1State> {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");

  // Validate
  const parsed = SignupStep1Schema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors above.",
      errors: fe,
      // Never echo the password back; email is fine to re-fill the form
      data: { email: rawEmail },
    };
  }

  const { email, password } = parsed.data;

  try {
    // 1) Does the email already exist?
    const existing = await sql<{ id: string }[]>`
      SELECT id
      FROM users
      WHERE lower(email) = lower(${email})
      LIMIT 1;
    `;

    if (existing.length > 0) {
      return {
        ok: false,
        message: "An account already exists with this email.",
        errors: { email: ["This email is already registered."] },
        data: { email },
      };
    }

    // 2) Hash & create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const inserted = await sql<{ id: string }[]>`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING id;
    `;

    const userId = Number(inserted[0]?.id);

    // 3) Set short-lived verify cookies (httpOnly)
    const cookieStore = await cookies();
    const maxAge = 10 * 60; // 10 minutes

    cookieStore.set("verify_uid", String(userId), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: VERIFY_EMAIL_COOKIE_PATH,
      maxAge,
    });

    cookieStore.set("verify_email", email, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: VERIFY_EMAIL_COOKIE_PATH,
      maxAge,
    });

    // mark this verification as coming from "signup" flow
    cookieStore.set("verify_mode", "signup", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: VERIFY_EMAIL_COOKIE_PATH,
      maxAge,
    });

    // 4) Send verification code email
    await issueVerificationCode({ userId, email });
  } catch (err) {
    console.error("signupStep1 error:", err);
    return {
      ok: false,
      message: "Something went wrong creating your account. Please try again.",
      data: { email },
    };
  }

  // Server-side redirect is OK here because this action is used in a simple form,
  // not with useActionState expecting a state back.
  redirect("/u/verify");
}

export const resetPassword = async (
  _prevState: ResetPasswordState | undefined,
  formData: FormData
): Promise<ResetPasswordState> => {
  const rawPassword = String(formData.get("password") ?? "");
  const rawConfirm = String(formData.get("confirmPassword") ?? "");

  const parsed = ResetPasswordSchema.safeParse({
    password: rawPassword,
    confirmPassword: rawConfirm,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please correct the errors below.",
      errors: fe as ResetPasswordState["errors"],
      // never echo passwords back
    };
  }

  const { password } = parsed.data;

  // Read reset_uid from cookies
  const cookieStore = await cookies();
  const resetUidRaw = cookieStore.get("reset_uid")?.value;
  const userId = resetUidRaw ? Number(resetUidRaw) : undefined;

  if (!userId) {
    return {
      ok: false,
      message:
        "Your reset session has expired. Please start the password reset process again.",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE id = ${userId};
    `;

    // Clear reset_uid cookie
    cookieStore.set("reset_uid", "", {
      path: VERIFY_EMAIL_COOKIE_PATH,
      maxAge: 0,
    });

    // // Option A: redirect to login (recommended)
    // redirect("/u/login");

    // If you prefer returning a state and handling redirect client-side:
    return {
      ok: true,
      message: "Your password has been updated. You can now log in.",
      redirectTo: "/u/login",
    };
  } catch (err) {
    console.error("resetPassword error:", err);
    return {
      ok: false,
      message: "Failed to update your password. Please try again.",
    };
  }
};
