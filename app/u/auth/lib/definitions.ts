import { FieldErrors } from "@/app/lib/definitions";
import z from "zod";
import {
  AuthSchema,
  ChangePasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignupSchema,
  VerifyCodeSchema,
} from "./schema";

export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
  // redirectTo?: string;
  // requiresVerification?: boolean;
};

type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordState = ActionState<ResetPassword>;

type Signup = z.infer<typeof SignupSchema>;
export type SignupState = ActionState<Signup>;

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordState = ActionState<ForgotPassword>;

type VerifyCode = z.infer<typeof VerifyCodeSchema>;
export type VerifyCodeState = ActionState<VerifyCode>;

type Auth = z.infer<typeof AuthSchema>;
export type AuthState = ActionState<Auth>;

export type UserForLogin = {
  userId: number;
  hashedPassword: string;
  roles: string[];
  fullName: string | null;
  emailVerifiedAt: Date | null;
};

type ChangePassword = z.infer<typeof ChangePasswordSchema>;
export type ChangePasswordState = ActionState<ChangePassword>;

export type VerifyMode = "login" | "signup" | "reset";

export const VERIFY_COOKIES = {
  uid: "verify_uid",
  email: "verify_email",
  mode: "verify_mode",
  exp: "verify_exp",
} as const;

export type VerifyCookieKey =
  (typeof VERIFY_COOKIES)[keyof typeof VERIFY_COOKIES];

export type VerifyContext = {
  userId: number;
  email: string;
  mode: VerifyMode;
  maxAgeSeconds?: number;
  expiresAtMs?: number;
};

export type VerifyState = {
  ok?: boolean;
  message?: string;
};

export type VerifyCookieEntry = {
  key: VerifyCookieKey;
  value: string;
  httpOnly: boolean;
};

export type EmailVerificationRow = {
  codeHash: string;
  expiresAt: Date;
  attempts: number;
};
