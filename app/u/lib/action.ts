"use server";

import { sql } from "@/app/lib/db"; // must return { rows: T[] }
import { createSession } from "@/app/lib/session";
import bcrypt from "bcrypt"; // or see note below for bcryptjs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

import {
  buildFullName,
  findUserIdByEmail,
  startVerificationFlow,
  toActionErrors,
  VERIFY_EMAIL_COOKIE_PATH,
} from "./helper";
import {
  AuthSchema,
  ChangePasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignupSchema,
} from "./schema";

import type {
  AuthState,
  ChangePasswordState,
  ForgotPasswordState,
  ResetPasswordState,
  SignupState,
} from "./definitions";

export const changePassword = async (
  _prevState: ChangePasswordState | undefined,
  formData: FormData
): Promise<ChangePasswordState> => {
  const rawCurrent = String(formData.get("currentPassword") ?? "");
  const rawNew = String(formData.get("newPassword") ?? "");
  const rawConfirm = String(formData.get("confirmNewPassword") ?? "");

  const parsed = ChangePasswordSchema.safeParse({
    currentPassword: rawCurrent,
    newPassword: rawNew,
    confirmNewPassword: rawConfirm,
  });

  if (!parsed.success) {
    // Zod validation failed – return field-level errors
    return toActionErrors<ChangePasswordState["errors"]>(parsed.error);
  }

  const { currentPassword, newPassword } = parsed.data;

  // 1) Ensure user is logged in
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      ok: false,
      message: "You must be logged in to change your password.",
    };
  }

  const userId = session.userId;

  try {
    // 2) Fetch current hashed password from DB
    const rows = await sql<{ password: string }[]>`
      SELECT password
      FROM users
      WHERE id = ${userId}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return {
        ok: false,
        message: "Account not found.",
      };
    }

    const hashedPassword = rows[0].password;

    // 3) Compare current password
    const match = await bcrypt.compare(currentPassword, hashedPassword);
    if (!match) {
      return {
        ok: false,
        message: "Please check your current password and try again.",
        errors: {
          currentPassword: ["Current password is incorrect."],
        } as ChangePasswordState["errors"],
      };
    }

    // 4) Hash and update new password
    const newHash = await bcrypt.hash(newPassword, 12);

    await sql`
      UPDATE users
      SET password = ${newHash}
      WHERE id = ${userId};
    `;

    return {
      ok: true,
      message: "Your password has been updated successfully.",
    };
  } catch (err) {
    console.error("changePassword error:", err);
    return {
      ok: false,
      message: "Something went wrong updating your password. Please try again.",
    };
  }
};

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
    return {
      ...toActionErrors<AuthState["errors"]>(parsed.error),
      data: { email: rawEmail },
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

    if (!user.emailVerifiedAt) {
      await startVerificationFlow({
        userId: user.userId,
        email,
        mode: "login",
      });

      return {
        ok: true,
        requiresVerification: true,
        redirectTo: "/u/verify",
        data: { email },
      };
    }

    const fullName = buildFullName(user.fullName, email);

    // ✅ Only create session if verified
    await createSession(Number(user.userId), user.roles, { fullName });
  } catch (error) {
    console.error("Failed to login", error);
    return {
      ok: false,
      message:
        "An error occurred while processing your request. Please try again.",
      data: { email },
    };
  }
  redirect("/account");
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
    return {
      ...toActionErrors<ForgotPasswordState["errors"]>(parsed.error),
      data: { email: rawEmail },
    };
  }

  const { email } = parsed.data;

  try {
    const userId = await findUserIdByEmail(email);

    if (userId) {
      await startVerificationFlow({
        userId,
        email,
        mode: "reset",
      });
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
export async function signup(
  _prevState: SignupState | undefined,
  formData: FormData
): Promise<SignupState> {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");

  // Validate
  const parsed = SignupSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    return {
      ...toActionErrors<SignupState["errors"]>(parsed.error),
      data: { email: rawEmail },
    };
  }

  const { email, password } = parsed.data;

  try {
    const existingId = await findUserIdByEmail(email);

    if (existingId) {
      return {
        ok: false,
        message: "An account already exists with this email.",
        errors: { email: ["This email is already registered."] },
        data: { email },
      };
    }

    // 2) Hash & create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const inserted = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING id;
    `;

    const userId = inserted[0]?.id;

    await startVerificationFlow({
      userId,
      email,
      mode: "signup",
    });
  } catch (err) {
    console.error("signup error:", err);
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
    return {
      ...toActionErrors<ResetPasswordState["errors"]>(parsed.error),
      data: {},
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
