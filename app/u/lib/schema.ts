import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
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
