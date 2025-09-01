// app/u/lib/verify-actions.ts
"use server";

import { createSession } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { issueVerificationCode, verifyEmailCode } from "../../lib/verification";

// (Optional) If you want a type:
type CookieJar = Awaited<ReturnType<typeof cookies>>;

export type VerifyState = {
  ok?: boolean;
  message?: string;
};

async function getVerifyContext() {
  const jar: CookieJar = await cookies(); // ✅ must await
  const uidRaw = jar.get("verify_uid")?.value;
  const email = jar.get("verify_email")?.value;
  const userId = uidRaw ? Number(uidRaw) : undefined;
  return { userId, email, jar };
}

export async function verifyCodeAction(
  _prev: VerifyState | undefined,
  formData: FormData
): Promise<VerifyState | never> {
  const code = String(formData.get("code") ?? "").trim();
  const { userId, email, jar } = await getVerifyContext(); // ✅ await

  if (!userId || !email) {
    return {
      ok: false,
      message: "Verification session expired. Please sign up again.",
    };
  }
  if (!/^\d{6}$/.test(code)) {
    return { ok: false, message: "Enter the 6-digit code." };
  }

  const res = await verifyEmailCode({ userId, code });
  if (!res.ok) return { ok: false, message: res.message };

  // clear verify cookies (server action, so set() is allowed)
  jar.set("verify_uid", "", { path: "/", maxAge: 0 });
  jar.set("verify_email", "", { path: "/", maxAge: 0 });

  await createSession(String(userId), false);
  redirect("/"); // or wherever
}

export async function resendCodeAction(): Promise<VerifyState> {
  const { userId, email } = await getVerifyContext(); // ✅ await
  if (!userId || !email) {
    return {
      ok: false,
      message: "Verification session expired. Please sign up again.",
    };
  }
  return issueVerificationCode({ userId, email });
}
