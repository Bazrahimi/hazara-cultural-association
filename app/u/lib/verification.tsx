// app/u/lib/verification.tsx
"use server";

import { sql } from "@/app/lib/db";
import bcrypt from "bcrypt"; // or: import bcrypt from "bcrypt";
import { FROM_EMAIL, resend } from "../ui/resend/email";
import VerifyEmailCode from "../ui/resend/VerifyEmailCode";

type VerifyRow = { code_hash: string; expires_at: string; attempts: number };

// export const CODE_TTL_MINUTES = 10;
// export const RESEND_COOLDOWN_SECONDS = 60;

// export function generate6DigitCode(): string {
//   return String(randomInt(0, 1_000_000)).padStart(6, "0");
// }

export async function issueVerificationCode({
  userId,
  email,
  fullName,
}: {
  userId: number;
  email: string;
  fullName?: string | null;
}) {
  const code = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
  const codeHash = await bcrypt.hash(code, 12);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await sql`
    INSERT INTO public.email_verifications (user_id, code_hash, expires_at, attempts, last_sent_at)
    VALUES (${userId}, ${codeHash}, ${expiresAt.toISOString()}, 0, now())
    ON CONFLICT (user_id) DO UPDATE
      SET code_hash = EXCLUDED.code_hash,
          expires_at = EXCLUDED.expires_at,
          attempts = 0,
          last_sent_at = now(),
          updated_at = now()
  `;

  await resend.emails.send({
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
  const res = await sql<VerifyRow[]>`
    SELECT code_hash, expires_at, attempts
    FROM public.email_verifications
    WHERE user_id = ${userId}
    LIMIT 1;
  `;
  const rec = res[0];
  if (!rec) {
    return { ok: false as const, message: "No verification code found." };
  }

  // Expired?
  if (new Date(rec.expires_at).getTime() < Date.now()) {
    return {
      ok: false as const,
      message: "Code has expired. Request a new one.",
    };
  }

  // Match?
  const isMatch = await bcrypt.compare(code, rec.code_hash);
  if (!isMatch) {
    await sql`
      UPDATE public.email_verifications
      SET attempts = attempts + 1, updated_at = now()
      WHERE user_id = ${userId}
    `;
    return { ok: false as const, message: "Invalid code. Please try again." };
  }

  // Success: mark the user verified and remove the code
  await sql.begin(async (trx) => {
    await trx`UPDATE public.users SET email_verified_at = now() WHERE id = ${userId}`;
    await trx`DELETE FROM public.email_verifications WHERE user_id = ${userId}`;
  });

  return { ok: true as const, message: "Email verified." };
}
