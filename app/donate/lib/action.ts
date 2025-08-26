"use server";
import { FieldErrors } from "@/app/lib/definitions";
import { z } from "zod";
import { DonationState } from "./definitions";
import { Donation, DonationSchema } from "./schema";

/** 3) Server action */
export async function submitDonation(
  _prev: DonationState | undefined,
  formData: FormData
) {
  // Gather raw values from the form
  console.log(formData);

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

  const validated = DonationSchema.safeParse(raw);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: tree as FieldErrors<Donation>,
      // return some data to keep fields sticky
      data: {
        fullName: raw.fullName,
        email: raw.email,
        contactNumber: raw.contactNumber,
        address1: raw.address1,
        address2: raw.address2,
        suburb: raw.suburb,
        state: raw.state,
      },

      // amount / postCode are coerced; you can include them too if you like
    };
  }

  const data = validated.data;

  console.log("date______", data)

  return {
    ok: true,
    message: "Thanks for your donation! 🎉",
    data,
  };
}
