import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }).trim(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." }),
});
