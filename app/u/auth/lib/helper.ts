import { sql } from "@/app/lib/db";
import z from "zod";
import { setVerifyCookies } from "./cookies";
import { type VerifyMode } from "./definitions";
import { issueVerificationCode } from "./verification";

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
  message = "Please review and correct the highlighted fields.",
): { ok: false; message: string; errors: TErrors } => {
  const { fieldErrors } = z.flattenError(error);

  return {
    ok: false,
    message,
    errors: fieldErrors as TErrors,
  };
};

export const findUserIdByEmail = async (
  email: string,
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
  email: string,
): string => {
  const trimmed = (maybeFullName ?? "").trim();
  if (trimmed.length > 0) return trimmed;
  return email.split("@")[0];
};
