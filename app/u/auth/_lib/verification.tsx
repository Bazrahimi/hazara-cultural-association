// app/u/lib/verification.tsx
"use server";

import bcrypt from "bcrypt"; // or: import bcrypt from "bcrypt";
import { emailClient, FROM_EMAIL } from "../../../ui/global/email/client";
import {
  getEmailVerificationRow,
  incrementEmailVerificationAttempts,
  upsertEmailVerification,
  verifyUserEmailAndDeleteCode,
} from "./data";
import { generate6DigitCode } from "./helper";

// import { FROM_EMAIL, resend } from "../ui/resend/email";
import VerifyEmailCode from "../ui/resend/VerifyEmailCode";
import { VERIFICATION_TTL_SECONDS } from "./constants";

export async function issueVerificationCode({
  userId,
  email,
  fullName,
}: {
  userId: number;
  email: string;
  fullName?: string | null;
}) {
  const code = generate6DigitCode();
  const codeHash = await bcrypt.hash(code, 12);
  const expiresAtMs = Date.now() + VERIFICATION_TTL_SECONDS * 1000;
  const expiresAt = new Date(expiresAtMs);

  // 1) DB: store codeHash + expiry
  await upsertEmailVerification({
    userId: userId,
    codeHash,
    expiresAt,
  });

  await emailClient.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "Your verification code",
    react: <VerifyEmailCode fullName={fullName ?? undefined} code={code} />, // ✅ JSX ok in .tsx
  });

  return { ok: true as const, message: "Verification code sent." };
}

/** Verify a submitted 6-digit code. */
export async function verifyEmailCode({
  userId,
  code,
}: {
  userId: number;
  code: string;
}) {
  const rec = await getEmailVerificationRow(userId);

  if (!rec) {
    return { ok: false as const, message: "No verification code found." };
  }

  // Expired?
  if (new Date(rec.expiresAt).getTime() < Date.now()) {
    return {
      ok: false as const,
      message: "Code has expired. Request a new one.",
    };
  }

  // Match?
  const isMatch = await bcrypt.compare(code, rec.codeHash);
  if (!isMatch) {
    await incrementEmailVerificationAttempts(userId);
    return { ok: false as const, message: "Invalid code. Please try again." };
  }

  // Success
  await verifyUserEmailAndDeleteCode(userId);

  return { ok: true as const, message: "Email verified." };
}
