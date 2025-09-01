"use server";

import { sql } from "@/app/lib/db"; // must return { rows: T[] }
import bcrypt from "bcrypt"; // or see note below for bcryptjs
import { SignupStep1Schema, type SignupStep1State } from "./schema";
import { issueVerificationCode } from "./verification";

/**
 * Step 1 of signup: validate email/password, ensure email is free,
 * create the user with a hashed password.
 */
export async function signupStep1(
  _prevState: SignupStep1State | undefined,
  formData: FormData
): Promise<SignupStep1State> {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");

  // Validate
  const parsed = SignupStep1Schema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors above.",
      errors: fe,
      // Never echo the password back; email is fine to re-fill the form
      data: { email: rawEmail },
    };
  }

  const { email, password } = parsed.data;

  try {
    // 1) Does the email already exist?
    const existing = await sql<{ id: string }[]>`
      SELECT id
      FROM users
      WHERE lower(email) = lower(${email})
      LIMIT 1;
    `;

    if (existing.length > 0) {
      return {
        ok: false,
        message: "An account already exists with this email.",
        errors: { email: ["This email is already registered."] },
        data: { email },
      };
    }

    // 2) Hash & create user
    const hashedPassword = await bcrypt.hash(password, 12);

    // Adjust column names to your schema
    const inserted = await sql<{ id: string }[]>`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING id;
    `;

    const userId = Number(inserted[0]?.id);

    const sent = await issueVerificationCode({ userId, email });
    return {
      ok: true,
      message: "Account created. Continue to the next step.",
      data: { email },
    };
  } catch (err) {
    console.error("signupStep1 error:", err);
    return {
      ok: false,
      message: "Something went wrong creating your account. Please try again.",
      data: { email },
    };
  }
}
