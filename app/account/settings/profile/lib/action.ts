"use server";
import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { FieldErrors, Profile, ProfileSchema, ProfileState } from "./schema";

export async function updateProfileAction(
  _prev: ProfileState | undefined,
  formData: FormData
): Promise<ProfileState | never> {
  const { userId } = await requireUser();

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
      message: "Please fix the errors above.",
      errors: fe,
      data: raw,
    };
  }

  const { firstName, lastName, contactNumber } = parsed.data;

  try {
    await sql`
      INSERT INTO user_profiles (user_id, first_name, last_name, phone)
      VALUES (${userId}, ${firstName}, ${lastName}, ${contactNumber ?? null})
      ON CONFLICT (user_id) DO UPDATE
        SET first_name = EXCLUDED.first_name,
            last_name  = EXCLUDED.last_name,
            phone      = EXCLUDED.phone,
            updated_at = now()
    `;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("failed to update Profile", err);
    return {
      ok: false,
      message: "Something went wrong while saving your profile.",
      data: parsed.data,
    };
  }

  redirect("/account/settings/addresses");
}
