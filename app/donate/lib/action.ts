"use server";
import { z } from "zod";
import { DonationState } from "./schema";
import { DonationSchema } from "./schema";
import { FieldErrors } from "./schema";
import { Donation } from "./schema";


/* ── Server action ───────────────────────────────────────────────────────── */
export async function submitDonation(
  _prev: DonationState | undefined,
  formData: FormData
): Promise<DonationState> {
  const raw = {
    amount: formData.get("amount"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    suburb: formData.get("suburb"),
    state: formData.get("state"),
    postCode: formData.get("postCode"),
  };

  const parsed = DonationSchema.safeParse(raw);

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors as FieldErrors<Donation>;
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fe,
      data: {
        fullName: String(raw.fullName ?? ""),
        email: String(raw.email ?? ""),
        contactNumber: String(raw.contactNumber ?? ""),
        address1: String(raw.address1 ?? ""),
        address2: String(raw.address2 ?? ""),
        suburb: String(raw.suburb ?? ""),
        state: String(raw.state ?? ""),
        // amount/postCode are coerced; include if you want:
        // amount: Number(raw.amount ?? 0),
        // postCode: Number(raw.postCode ?? 0),
      },
    };
  }

  const data = parsed.data;

  // TODO: persist / payment intent / email
  return {
    ok: true,
    message: "Thanks for your donation! 🎉",
    data,
  };
}
