import { sql } from "@/app/lib/db";
import type { EmailVerificationRow, UserForLogin } from "./definitions";

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

export const getHashedPassword = async (
  userId: number,
): Promise<string | null> => {
  const rows = await sql<{ password: string }[]>`
      SELECT password
      FROM users
      WHERE id = ${userId}
      LIMIT 1;
    `;
  return rows[0]?.password ?? null;
};

export const updateUserPassword = async (
  userId: number,
  hashedPassword: string,
): Promise<boolean> => {
  const rows = await sql<{ id: number }[]>`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE id = ${userId};
    `;

  return rows.length === 1;
};

export const getUserForLogin = async (
  email: string,
): Promise<UserForLogin | null> => {
  const rows = await sql<UserForLogin[]>`
    SELECT
      u.id AS "userId",
      u.password AS "hashedPassword",
      u.email_verified_at AS "emailVerifiedAt",
      NULLIF(TRIM(COALESCE(up.first_name, '') || ' ' || COALESCE(up.last_name, '')), '') AS "fullName",
      COALESCE(
        array_agg(r.name ORDER BY r.name)
        FILTER (WHERE r.name IS NOT NULL),
        '{}'
      ) AS roles
    FROM users u
    LEFT JOIN user_profiles up ON up.user_id = u.id
    LEFT JOIN user_roles ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    WHERE lower(u.email) = lower(${email})
    GROUP BY u.id, up.first_name, up.last_name, u.email_verified_at
    LIMIT 1
  `;

  return rows[0] ?? null;
};

export const insertUser = async (
  email: string,
  hashedPassword: string,
): Promise<number> => {
  const rows = await sql<{ id: number }[]>`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
    RETURNING id;
  `;

  const id = rows[0]?.id;
  if (!id) throw new Error("Failed to insert user");
  return id;
};

export const upsertEmailVerification = async ({
  userId,
  codeHash,
  expiresAt,
}: {
  userId: number;
  codeHash: string;
  expiresAt: Date;
}): Promise<void> => {
  await sql`
    INSERT INTO public.email_verifications 
      (user_id, code_hash, expires_at, attempts, last_sent_at)
    VALUES 
      (${userId}, ${codeHash}, ${expiresAt.toISOString()}, 0, now())
    ON CONFLICT (user_id) DO UPDATE
      SET code_hash = EXCLUDED.code_hash,
          expires_at = EXCLUDED.expires_at,
          attempts = 0,
          last_sent_at = now(),
          updated_at = now()
  `;
};

export const getEmailVerificationRow = async (
  userId: number,
): Promise<EmailVerificationRow | null> => {
  const rows = await sql<EmailVerificationRow[]>`
    SELECT
      code_hash AS "codeHash",
      expires_at AS "expiresAt",
      attempts  AS "attempts"
    FROM public.email_verifications
    WHERE user_id = ${userId}
    LIMIT 1;
  `;

  return rows[0] ?? null;
};

export const incrementEmailVerificationAttempts = async (
  userId: number,
): Promise<void> => {
  await sql`
    UPDATE public.email_verifications
    SET attempts = attempts + 1, updated_at = now()
    WHERE user_id = ${userId};
  `;
};

export const verifyUserEmailAndDeleteCode = async (
  userId: number,
): Promise<void> => {
  await sql.begin(async (trx) => {
    await trx`
      UPDATE public.users
      SET email_verified_at = now()
      WHERE id = ${userId};
    `;

    await trx`
      DELETE FROM public.email_verifications
      WHERE user_id = ${userId};
    `;
  });
};
