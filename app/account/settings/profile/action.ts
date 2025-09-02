// app/account/settings/profile/actions.ts
"use server";

import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(80),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(80),
  contactNumber: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .refine((v) => v === undefined || /^\+?\d{6,15}$/.test(v), {
      message: "Enter a valid phone number (e.g. +61412345678)",
    }),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ProfileState = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors<Profile>;
  data?: Partial<Profile>;
};

export async function updateProfileAction(
  _prev: ProfileState | undefined,
  formData: FormData
): Promise<ProfileState | never> {
  const { userId } = await requireUser(); // redirects if not logged in

  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    contactNumber: String(formData.get("contactNumber") ?? ""),
  };

  const parsed = ProfileSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors as FieldErrors<Profile>;
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fe,
      data: raw,
    };
  }

  const { firstName, lastName, contactNumber } = parsed.data;

  // Upsert into user_profiles
  await sql`
    INSERT INTO user_profiles (user_id, first_name, last_name, phone)
    VALUES (${userId}, ${firstName}, ${lastName}, ${contactNumber ?? null})
    ON CONFLICT (user_id) DO UPDATE
      SET first_name = EXCLUDED.first_name,
          last_name  = EXCLUDED.last_name,
          phone      = EXCLUDED.phone,
          updated_at = now()
  `;

  revalidatePath("/account/settings");
  return { ok: true, message: "Profile updated." };
}
