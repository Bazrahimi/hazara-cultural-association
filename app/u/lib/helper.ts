import { sql } from "@/app/lib/db";
import { cookies } from "next/headers";
import z from "zod";
import { issueVerificationCode } from "./verification";
export const VERIFY_EMAIL_COOKIE_PATH = "/u";

export type VerifyMode = "login" | "signup" | "reset";

type SetVerifyCookiesOption = {
  userId: number;
  email: string;
  mode: VerifyMode;
  MaxAgeSeconds?: number;
};

const setVerifyCookies = async ({
  userId,
  email,
  mode,
  MaxAgeSeconds = 10 * 60, // 10 minutes
}: SetVerifyCookiesOption) => {
  const cookiesStore = await cookies();

  cookiesStore.set("verify_uid", String(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: MaxAgeSeconds,
  });

  cookiesStore.set("verify_email", email, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: MaxAgeSeconds,
  });

  cookiesStore.set("verify_mode", mode, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: MaxAgeSeconds,
  });
};

export const startVerificationFlow = async ({
  userId,
  email,
  mode,
}: {
  userId: number;
  email: string;
  mode: VerifyMode;
}) => {
  await setVerifyCookies({ userId, email, mode });
  await issueVerificationCode({ userId, email });
};

export const toActionErrors = <TErrors>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: z.ZodError<any>,
  message = "Please fix the errors above."
): { ok: false; message: string; errors: TErrors } => {
  const { fieldErrors } = z.flattenError(error);

  return {
    ok: false,
    message,
    errors: fieldErrors as TErrors,
  };
};

export const findUserIdByEmail = async (
  email: string
): Promise<number | null> => {
  const rows = await sql<{ id: number }[]>`
    SELECT
      id
    FROM
      users
    WHERE
      lower(email) = lower(${email})
    LIMIT 1
  `;
  return rows.length > 0 ? rows[0].id : null;
};

export const buildFullName = (
  maybeFullName: string | null,
  email: string
): string => {
  const trimmed = (maybeFullName ?? "").trim();
  if (trimmed.length > 0) return trimmed;
  return email.split("@")[0];
};
