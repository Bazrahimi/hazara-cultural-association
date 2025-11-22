import { z } from "zod";

export const AuthSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .trim()
    .transform((v) => v.toLowerCase()), // normalize

  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." }),
});

export const SignupSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .transform((v) => v.trim().toLowerCase()),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .transform((v) => v.trim().toLowerCase()),
});

// 🔹 New: Reset password schema
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(100, "Password is too long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
