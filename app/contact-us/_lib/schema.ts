import { z } from "zod";

export const EnquirySchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.email({ message: "Please enter a valid email address" }).trim(),
  contactNumber: z
    .string()
    .optional()
    .refine((v) => !v || v.trim().length > 0, {
      message: "Invalid phone number",
    }),
  queryType: z.coerce
    .number()
    .int()
    .min(1, { message: "Please select your query type" })
    .max(20, { message: "Please select your query type" }),
  qMessage: z.string().min(2, { message: "please enter your message" }),
});
