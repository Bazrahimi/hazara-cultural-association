import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }).trim(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." }),
});

export const QuickEnquirySchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.email({ message: "Please enter a valid email address" }),
  contactNumber: z
    .string()
    .optional()
    .refine((v) => !v || v.trim().length > 0, {
      message: "Invalid phone number",
    }),
  queryType: z.string().min(2, { message: "please select your query type" }),
  qMessage: z.string().min(2, { message: "please enter your message" }),
});
