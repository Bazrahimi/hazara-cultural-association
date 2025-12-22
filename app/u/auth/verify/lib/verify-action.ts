// app/u/lib/verify-actions.ts
"use server";

import { AccountRoutes, AuthRoutes } from "@/app/lib/routes";
import { createSession } from "@/app/lib/session";
import {
  issueVerificationCode,
  verifyEmailCode,
} from "@/app/u/auth/lib/verification";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VERIFY_EMAIL_COOKIE_PATH } from "../../lib/helper";

export type VerifyState = {
  ok?: boolean;
  message?: string;
};

// If you like a local type alias:
type CookieStore = Awaited<ReturnType<typeof cookies>>;

async function getVerifyContext() {
  const sessionCookie: CookieStore = await cookies();

  const uidRaw = sessionCookie.get("verify_uid")?.value;
  const email = sessionCookie.get("verify_email")?.value;
  const mode = sessionCookie.get("verify_mode")?.value ?? "signup"; // "signup" | "reset"

  const userId = uidRaw ? Number(uidRaw) : undefined;

  return { userId, email, mode, sessionCookie };
}

export async function verifyCodeAction(
  _prev: VerifyState | undefined,
  formData: FormData
): Promise<VerifyState | never> {
  const code = String(formData.get("code") ?? "").trim();
  const { userId, email, mode, sessionCookie } = await getVerifyContext();

  if (!userId || !email) {
    return {
      ok: false,
      message: "Verification session expired. Please try again.",
    };
  }

  if (!/^\d{6}$/.test(code)) {
    return { ok: false, message: "Enter the 6-digit code." };
  }

  const res = await verifyEmailCode({ userId, code });
  if (!res.ok) return { ok: false, message: res.message };

  // 👉 IMPORTANT: set reset_uid for reset mode
  if (mode === "reset") {
    const maxAge = 10 * 60; // 10 minutes
    sessionCookie.set("reset_uid", String(userId), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: VERIFY_EMAIL_COOKIE_PATH,
      maxAge,
    });
  }

  const clearOpts = { path: VERIFY_EMAIL_COOKIE_PATH, maxAge: 0 };
  sessionCookie.set("verify_uid", "", clearOpts);
  sessionCookie.set("verify_email", "", clearOpts);
  sessionCookie.set("verify_mode", "", clearOpts);

  if (mode === "reset") {
    redirect(AuthRoutes.resetPassword());
  }

  await createSession(userId);

  redirect(AccountRoutes.profile());
}

export async function resendCodeAction(): Promise<VerifyState> {
  const { userId, email } = await getVerifyContext();

  if (!userId || !email) {
    return {
      ok: false,
      message:
        "Verification session expired. Please try again or request a new code.",
    };
  }

  return issueVerificationCode({ userId, email });
}
