"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { sql } from "./db";
import { LoginState } from "./definitions";
import { LoginSchema } from "./schema";
import { createSession } from "./session";

export const authenticate = async (
  prevState: LoginState,
  formData: FormData
) => {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;

  const validated = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  // if form field invalid, return early
  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    // Map to your expected fieldErrors shape

    return {
      email: rawEmail,
      password: rawPassword,
      errors: {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      },
    };
  }

  // if form field invalid, return early
  // if (!validated.success) {
  //   return {
  //     email: rawEmail,
  //     password: rawPassword,
  //     errors: validated.error.flatten().fieldErrors,
  //   };
  // }

  const { email, password } = validated.data;

  try {
    const result = await sql<
      { userId: number; hashedPassword: string; isAdmin: boolean }[]
    >`
      SELECT 
        id AS "userId", 
        password AS "hashedPassword", 
        is_admin AS "isAdmin" 
      FROM users 
      WHERE email = ${email}
    `;
    const user = result[0];

    if (!user)
      return {
        email,
        password,
        message: "No account found with the provided email address.",
      };

    const matched = await bcrypt.compare(password, user.hashedPassword);

    if (!matched)
      return {
        email,
        password,
        message: "Incorrect password. Please try again.",
      };
    if (user.isAdmin) {
      await createSession(String(user.userId), user.isAdmin);
    }
  } catch (error) {
    console.error("Failed to login", error);
    return {
      email,
      password,
      message:
        "An error occurred while processing your request. Please try again.",
    };
  }
};
