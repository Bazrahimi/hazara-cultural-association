import { sql } from "@/app/lib/db";
import type { UserForLogin } from "./definitions";

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
): Promise<void> => {
  await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE id = ${userId};
    `;
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
  hashedPassword: string
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

