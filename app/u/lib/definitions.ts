import { FieldErrors } from "@/app/lib/definitions";
import z from "zod";
import {
  AuthSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignupSchema,
} from "./schema";

export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
  redirectTo?: string;
  requiresVerification?: boolean;
};

type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordState = ActionState<ResetPassword>;

type SignupStep1 = z.infer<typeof SignupSchema>;
export type SignupStep1State = ActionState<SignupStep1>;

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordState = ActionState<ForgotPassword>;

type Auth = z.infer<typeof AuthSchema>;
export type AuthState = ActionState<Auth>;
