"use server";

import { sql } from "@/app/_lib/db";
import { requireUser } from "@/app/_lib/session/session";
import { redirect } from "next/navigation";
import {
  BillingAddressInput,
  BillingAddressInputState,
  BillingAddressSchema,
  FieldErrors,
} from "./schema";

type PgError = {
  code?: string;
  constraint?: string;
  detail?: string;
  message?: string;
};

export const billingAddressInput = async (
  _prev: BillingAddressInputState | undefined,
  formData: FormData,
): Promise<BillingAddressInputState> => {
  const { userId } = await requireUser();

  // Raw values from the form
  const raw: BillingAddressInput = {
    address: String(formData.get("address") ?? ""),
    address2: String(formData.get("address2") ?? ""),
    suburb: String(formData.get("suburb") ?? ""),
    state: String(formData.get("state") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    country: String(formData.get("country") ?? "AU"),
  };

  // Validate + normalize
  const parsed = BillingAddressSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten()
      .fieldErrors as FieldErrors<BillingAddressInput>;
    return {
      ok: false,
      message: "Please fix the above errors.",
      errors: fe,
      data: raw,
    };
  }

  const data = parsed.data;

  try {
    // One statement: clear old default, then insert new default
    await sql<[{ id: number }]>`
      WITH cleared AS (
        UPDATE user_addresses
        SET is_default = false, updated_at = now()
        WHERE user_id = ${userId} AND is_default = true
        RETURNING 1
      )
      INSERT INTO user_addresses
        (user_id, type, is_default, address1, address2, suburb, state_code, postcode, country)
      VALUES
        (${userId}, 'billing', true, ${data.address}, ${data.address2 ?? null},
         ${data.suburb}, ${data.state}, ${data.postcode}, ${data.country})
      RETURNING id
    `;
  } catch (e: unknown) {
    const err = e as PgError;
    console.error("Failed to create address", err);

    // Friendly mapping for common DB errors
    if (
      err.code === "23514" &&
      err.constraint === "user_addresses_postcode_format"
    ) {
      return {
        ok: false,
        message: "Invalid postcode format.",
        errors: { postcode: ["Enter a valid postcode (3–10 chars)"] },
        data: data,
      };
    }
    if (
      err.code === "23505" &&
      err.constraint === "user_addresses_one_default_per_user"
    ) {
      // Race condition safety: someone saved another default just now
      return {
        ok: false,
        message: "Another default address already exists. Please try again.",
        data: data,
      };
    }

    return {
      ok: false,
      message:
        "Something went wrong while saving your address. Please try later.",
      data: raw, // echo back user input
    };
  }

  redirect("/account");
};
