// schema.ts
import z from "zod";
const EmailField = z
  .email({
    message:
      "That doesn’t look like a valid email. Please check the format (e.g., name@example.com).",
  })
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

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Your current password is required." }),

    newPassword: PasswordField, // reuses your global policy

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New passwords do not match.",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "Your new password must be different from your current password.",
  });
