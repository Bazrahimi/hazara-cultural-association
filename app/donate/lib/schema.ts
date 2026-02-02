import { ActionState } from "@/app/_lib/actionHelper";
import { z } from "zod";

/* ── Schema ──────────────────────────────────────────────────────────────── */
export const DonationSchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  amount: z.coerce.number().gt(1, { message: "Please enter an amount > 1" }),
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

export type Donation = z.infer<typeof DonationSchema>;

export type DonationState = ActionState<Donation>;
