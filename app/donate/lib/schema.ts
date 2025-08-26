import { z } from "zod";

export const DonationSchema = z.object({
  amount: z.coerce.number().positive({ message: "Please enter an amount > 0" }),
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.email({ message: "Please enter a valid email address" }),

  contactNumber: z.string().optional(), // keep as string; users often include spaces
  address: z.string().min(5, { message: "Please enter your street address" }),
  suburb: z.string().min(2, { message: "Please enter your suburb/city" }),
  state: z.enum(["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"], {
    errorMap: () => ({ message: "Please select a state" }),
  }),
  postCode: z.coerce
    .number()
    .int()
    .min(0)
    .max(9999, { message: "Postcode must be 4 digits" }),
  creditCard: z.boolean(),
});

export type Donation = z.infer<typeof DonationSchema>;
