// app/u/lib/verify-actions.ts
"use server";

import { createSession } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { issueVerificationCode, verifyEmailCode } from "@/app/u/lib/verification";
import { VERIFY_EMAIL_COOKIE_PATH } from "./helper";

export type VerifyState = {
  ok?: boolean;
  message?: string;
};

// If you like a local type alias:
type CookieStore = Awaited<ReturnType<typeof cookies>>;

// Keep this in sync with where you originally set the cookies


async function getVerifyContext() {
  const sessionCookie: CookieStore = await cookies(); // ✅ await required
  const uidRaw = sessionCookie.get("verify_uid")?.value;
  const email = sessionCookie.get("verify_email")?.value;
  const userId = uidRaw ? Number(uidRaw) : undefined;
  return { userId, email, sessionCookie };
}

export async function verifyCodeAction(
  _prev: VerifyState | undefined,
  formData: FormData
): Promise<VerifyState | never> {
  const code = String(formData.get("code") ?? "").trim();
  const { userId, email, sessionCookie } = await getVerifyContext();

  if (!userId || !email) {
    return { ok: false, message: "Verification session expired. Please sign up again." };
  }
  if (!/^\d{6}$/.test(code)) {
    return { ok: false, message: "Enter the 6-digit code." };
  }

  const res = await verifyEmailCode({ userId, code });
  if (!res.ok) return { ok: false, message: res.message };

  // Clear short-lived verification cookies (path MUST match how they were set)
  sessionCookie.set("verify_uid", "", { path: VERIFY_EMAIL_COOKIE_PATH, maxAge: 0 });
  sessionCookie.set("verify_email", "", { path: VERIFY_EMAIL_COOKIE_PATH, maxAge: 0 });

  // Create the real session and go
  await createSession(userId);
  redirect("/account/settings/profile"); // or "/account"
}

export async function resendCodeAction(): Promise<VerifyState> {
  const { userId, email } = await getVerifyContext();
  if (!userId || !email) {
    return { ok: false, message: "Verification session expired. Please Try again or Login to get new code." };
  }
  return issueVerificationCode({ userId, email });
}
