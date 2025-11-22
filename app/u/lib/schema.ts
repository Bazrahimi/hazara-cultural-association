import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
  redirectTo?: string;
  requiresVerification?: boolean;
};

/** Step 1 schema */
export const SignupStep1Schema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .transform((v) => v.trim().toLowerCase()),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." }),
});

export type SignupStep1 = z.infer<typeof SignupStep1Schema>;
export type SignupStep1State = ActionState<SignupStep1>;

export const ForgotPasswordSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .transform((v) => v.trim().toLowerCase()),
});

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordState = ActionState<ForgotPassword>;

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

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordState = ActionState<ResetPassword>;