"use server";

import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

import { AddressInput, AddressState, FieldErrors } from "./definitions";
import { AddressSchema } from "./schema";

export async function saveAddressAction(
  _prev: AddressState | undefined,
  formData: FormData
): Promise<AddressState> {
  const { userId } = await requireUser();

  const raw: AddressInput = {
    id: String(formData.get("id") ?? "") || undefined,
    label: String(formData.get("label") ?? ""),
    type: String(formData.get("type") ?? "shipping") as "shipping" | "billing",
    isDefault: formData.get("isDefault") === "on",

    address: String(formData.get("address") ?? ""),
    address2: String(formData.get("address2") ?? ""),
    suburb: String(formData.get("suburb") ?? ""),
    stateCode: String(formData.get("stateCode") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    country: String(formData.get("country") ?? "AU"),
  };

  const parsed = AddressSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors as FieldErrors<AddressInput>;
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fe,
      data: raw,
    };
  }
  const data = parsed.data;

  // Transaction: if setting default, unset others first
  await sql.begin(async (trx) => {
    if (data.isDefault) {
      await trx`
        UPDATE user_addresses SET is_default = false
        WHERE user_id = ${userId}
      `;
    }

    if (data.id) {
      // Update existing (guard by user_id)
      await trx`
        UPDATE user_addresses
        SET label = ${data.label || null},
            type = ${data.type},
            is_default = ${!!data.isDefault},
            address1 = ${data.address},
            address2 = ${data.address2 || null},
            suburb = ${data.suburb},
            state_code = ${data.stateCode},
            postcode = ${data.postcode},
            country = ${data.country},
            updated_at = now()
        WHERE id = ${Number(data.id)} AND user_id = ${userId}
      `;
    } else {
      // Insert new
      await trx`
        INSERT INTO user_addresses
          (user_id, label, type, is_default, address1, address2, suburb, state_code, postcode, country)
        VALUES
          (${userId}, ${data.label || null}, ${data.type}, ${!!data.isDefault},
           ${data.address}, ${data.address2 || null}, ${data.suburb}, ${data.stateCode},
           ${data.postcode}, ${data.country})
      `;
    }
  });

  revalidatePath("/account/settings");
  return { ok: true, message: "Address saved." };
}

export async function deleteAddressAction(
  _prev: AddressState | undefined,
  formData: FormData
): Promise<AddressState> {
  const { userId } = await requireUser();
  const id = Number(formData.get("id") ?? 0);
  if (!id) return { ok: false, message: "Invalid address." };

  await sql`DELETE FROM user_addresses WHERE id = ${id} AND user_id = ${userId}`;
  revalidatePath("/account/settings");
  return { ok: true, message: "Address removed." };
}
