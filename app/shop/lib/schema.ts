import { z } from "zod";

export const CheckoutSchema = z.object({
  amount: z.coerce.number().gt(1, { message: "Please enter an amount > 1" }),
  firstName: z.string().min(2, { message: "Please enter your first name" }),
  lastName: z.string().min(2, { message: "Please enter your last name" }),
  email: z.email({ message: "Please enter a valid email address" }),
  contactNumber: z.string().optional(),
  address1: z.string().min(5, { message: "Please enter your street address" }),
  address2: z.string().optional(),
  suburb: z.string().min(2, { message: "Please enter your suburb/city" }),
  stateCode: z.string().min(2, { message: "Select your State" }),
  postCode: z
    .string()
    .regex(/^\d{4}$/, "Postcode must be 4 digits")
    .transform(Number),
});

export type Checkout = z.infer<typeof CheckoutSchema>;

/* ── Action-state helpers (same shape as your auth flow) ─────────────────── */
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
};

export type CheckoutState = ActionState<Checkout>;
