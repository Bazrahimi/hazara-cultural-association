import { z } from "zod";

/* ── Schema ──────────────────────────────────────────────────────────────── */
export const DonationSchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  amount: z.coerce.number().positive({ message: "Please enter an amount > 0" }),
  email: z.email({ message: "Please enter a valid email address" }),
  contactNumber: z.string().optional(),
  address1: z.string().min(5, { message: "Please enter your street address" }),
  address2: z.string().optional(),
  suburb: z.string().min(2, { message: "Please enter your suburb/city" }),
  state: z.string({ message: "Select your State" }),
  postCode: z.coerce.number(),
});

export type Donation = z.infer<typeof DonationSchema>;

/* ── Action-state helpers (same shape as your auth flow) ─────────────────── */
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
};
export type DonationState = ActionState<Donation>;