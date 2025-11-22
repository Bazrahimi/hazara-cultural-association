// schema.ts
import z from "zod";
const EmailField = z
  .email({ message: "Please enter a valid email address." })
  .transform((v) => v.trim().toLowerCase());

const PasswordField = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." });
// ↑ recommend aligning login/signup/reset to same policy if you want consistency

export const AuthSchema = z.object({
  email: EmailField,
  password: PasswordField,
});

export const SignupSchema = z.object({
  email: EmailField,
  password: PasswordField,
});

export const ForgotPasswordSchema = z.object({
  email: EmailField,
});

export const ResetPasswordSchema = z
  .object({
    password: PasswordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
