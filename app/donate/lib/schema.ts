import { z } from "zod";

export const DonationSchema = z.object({
  amount: z.number(),
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.email({ message: "Please enter a valid email address" }).trim(),
  contactNumber: z
    .string()
    .optional()
    .refine((v) => !v || v.trim().length > 0, {
      message: "Invalid phone number",
    }),
  address: z.string().min(5, { message: "Please enter your Address line" }),
  suburb: z.string().min(3, { message: "Please enter your Suburb" }),
  state: z.string(),
  postCode: z.number(),
  creditCard: z.boolean(),
});
