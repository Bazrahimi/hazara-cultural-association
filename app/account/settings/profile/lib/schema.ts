import { ActionState } from "@/app/_lib/actionHelper";
import z from "zod";

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(30),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(30),
  contactNumber: z
    .string()
    .trim()
      .min(6, { message: "Contact is required" })
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => v === undefined || /^\+?\d{6,15}$/.test(v),
      { message: "Enter a valid phone number (e.g. +61412345678)" }
    ),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfileState = ActionState<Profile>

