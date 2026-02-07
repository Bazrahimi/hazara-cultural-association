"use server";
// app/u/auth/lib/action.ts
import { createSession } from "@/app/_lib/session/action";
import bcrypt from "bcrypt"; // or see note below for bcryptjs
import { redirect } from "next/navigation";
import { getSession } from "@/app/_lib/session/action";

import { toActionErrors } from "@/app/_lib/actionHelper";
import {
  clearResetUid,
  clearVerifyCookies,
  readResetUid,
  readVerifyCookies,
  setResetUid,
  setVerifyCookies,
} from "./cookies";
import {
  findUserIdByEmail,
  getHashedPassword,
  getUserForLogin,
  insertUser,
  updateUserPassword,
} from "./data";
import { startVerificationFlow } from "./flow";
import { buildFullName } from "./helper";
import {
  AuthSchema,
  ChangePasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignupSchema,
  VerifyCodeSchema,
} from "./schema";

import { AccountRoutes, AuthRoutes } from "@/app/_lib/routes";
import { safeAccountNext } from "@/app/_lib/session/authRedirects";
import { VERIFICATION_TTL_SECONDS } from "./constants";
import type {
  AuthState,
  ChangePasswordState,
  ForgotPasswordState,
  ResetPasswordState,
  SignupState,
  VerifyCodeState,
} from "./definitions";
import { issueVerificationCode, verifyEmailCode } from "./verification";

export const changePassword = async (
  _prevState: ChangePasswordState | undefined,
  formData: FormData,
): Promise<ChangePasswordState | undefined> => {
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
    const hashedPassword = await getHashedPassword(userId);

    if (!hashedPassword) {
      return {
        ok: false,
        message: "Account not found.",
      };
    }

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
    const ok = await updateUserPassword(userId, newHash);

    if (!ok) {
      return {
        ok: false,
        message: "Email or password is incorrect.",
      };
    }
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
  formData: FormData,
): Promise<AuthState | undefined> => {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");
  const next = String(formData.get("next")) ?? "";

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
    const user = await getUserForLogin(email);

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

      // redirect(AuthRoutes.verifyEmail());
      redirect(`${AuthRoutes.verifyEmail}?next=${encodeURIComponent(next)}`);
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

  redirect(safeAccountNext(next));
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
  formData: FormData,
): Promise<ForgotPasswordState | undefined> => {
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

      redirect(AuthRoutes.verifyEmail());
    }

    // 5) Always return the SAME message (don’t leak if email exists)
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
  formData: FormData,
): Promise<SignupState> {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");
  const next = String(formData.get("next"));

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

    const userId = await insertUser(email, hashedPassword);

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
  redirect(`${AuthRoutes.verifyEmail()}?next=${decodeURIComponent(next)}`);
}

export const resetPassword = async (
  _prevState: ResetPasswordState | undefined,
  formData: FormData,
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
  const userId = await readResetUid();

  if (!userId) {
    return {
      ok: false,
      message:
        "Your reset session has expired. Please start the password reset process again.",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const ok = await updateUserPassword(userId, hashedPassword);
    if (!ok) return { ok: false, message: "Account not found." };
    // Clear reset_uid cookie
    await clearResetUid();
  } catch (err) {
    console.error("resetPassword error:", err);
    return {
      ok: false,
      message: "Failed to update your password. Please try again.",
    };
  }
  redirect(AuthRoutes.login());
};

export const verifyCode = async (
  _prev: VerifyCodeState | undefined,
  formData: FormData,
): Promise<VerifyCodeState | never> => {
  const parsed = VerifyCodeSchema.safeParse({
    code: String(formData.get("code") ?? "").trim(),
  });

  if (!parsed.success) {
    return toActionErrors<VerifyCodeState["errors"]>(
      parsed.error,
      "Please enter the verification code.",
    );
  }

  const { code } = parsed.data;

  const ctx = await readVerifyCookies();
  if (!ctx) {
    return {
      ok: false,
      message: "Verification session expired. Please try again.",
    };
  }

  const res = await verifyEmailCode({ userId: ctx.userId, code });
  if (!res.ok) {
    return { ok: false, message: res.message };
  }

  // ✅ success: clear verify cookies
  await clearVerifyCookies();

  // ✅ reset flow
  if (ctx.mode === "reset") {
    await setResetUid(ctx.userId);
    redirect(AuthRoutes.resetPassword());
  }

  // ✅ login/signup flow
  // (if your createSession needs roles/fullName, fetch them here or keep minimal)
  await createSession(ctx.userId);

  const next = safeAccountNext(formData.get("next"));
  redirect(next || AccountRoutes.profile());
};

export const resendCode = async (): Promise<{
  ok: boolean;
  message: string;
  expiresAtMs?: number;
}> => {
  const ctx = await readVerifyCookies();

  if (!ctx) {
    return {
      ok: false,
      message:
        "Verification session expired. Please try again or request a new code.",
    };
  }

  // refresh cookie expiry window (new verify_exp + maxAge refresh)
  await setVerifyCookies({
    userId: ctx.userId,
    email: ctx.email,
    mode: ctx.mode,
    maxAgeSeconds: VERIFICATION_TTL_SECONDS,
  });

  // ctx has: userId, email, mode, expiresAtMs
  return issueVerificationCode({ userId: ctx.userId, email: ctx.email });
};
