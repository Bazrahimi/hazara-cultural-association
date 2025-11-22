"use server";

import { sql } from "@/app/lib/db"; // must return { rows: T[] }
import { createSession } from "@/app/lib/session";
import bcrypt from "bcrypt"; // or see note below for bcryptjs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VERIFY_EMAIL_COOKIE_PATH } from "../verify/lib/helper";
import {
  AuthSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignupSchema,
} from "./schema";
import { issueVerificationCode } from "./verification";

import type {
  AuthState,
  ForgotPasswordState,
  ResetPasswordState,
  SignupStep1State,
} from "./definitions";

export const auth = async (
  _prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> => {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");

  const parsed = AuthSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors above.",
      data: { email: rawEmail }, // never return password
      errors: fe as AuthState["errors"],
    };
  }

  const { email, password } = parsed.data;

  try {
    const result = await sql<
      {
        userId: number;
        hashedPassword: string;
        roles: string[];
        fullName: string | null;
        emailVerifiedAt: Date | null;
      }[]
    >`
        SELECT
          u.id AS "userId",
          u.password AS "hashedPassword",
          u.email_verified_at AS "emailVerifiedAt",
          COALESCE(
            up.first_name || ' ' || up.last_name,
            ''  
          ) AS "fullName",
          COALESCE(
            array_agg(r.name ORDER BY r.name)
          FILTER (WHERE r.name IS NOT NULL), 
          '{}'
          ) AS roles
        FROM users u
        LEFT JOIN user_profiles up  ON up.user_id = u.id
        LEFT JOIN user_roles ur     ON ur.user_id = u.id
        LEFT JOIN roles r           ON r.id = ur.role_id
        WHERE u.email = ${email}
        GROUP BY u.id, up.first_name, up.last_name, u.email_verified_at
        LIMIT 1
    `;

    const user = result[0];

    if (!user) {
      return {
        ok: false,
        message: "No account found with the provided email address.",
        data: { email },
      };
    }

    const matched = await bcrypt.compare(password, user.hashedPassword);
    if (!matched) {
      return {
        ok: false,
        message: "Incorrect password. Please try again.",
        data: { email },
      };
    }

    // 👇 NEW: require email verification before login
    if (!user.emailVerifiedAt) {
      const cookieStore = await cookies();
      const maxAge = 10 * 60; // 10 minutes, same as signupStep1

      cookieStore.set("verify_uid", String(user.userId), {
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

      await issueVerificationCode({ userId: Number(user.userId), email });
      return {
        ok: true,
        requiresVerification: true,
        redirectTo: "/u/verify",
        data: { email },
      };
    }

    // Build a safe greeting/name value
    const fullName =
      user.fullName && user.fullName.trim().length > 0
        ? user.fullName.trim()
        : email.split("@")[0];

    // ✅ Only create session if verified
    await createSession(Number(user.userId), user.roles, { fullName });

    redirect("/account");
  } catch (error) {
    console.error("Failed to login", error);
    return {
      ok: false,
      message:
        "An error occurred while processing your request. Please try again.",
      data: { email },
    };
  }
};

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
  const parsed = SignupSchema.safeParse({
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
