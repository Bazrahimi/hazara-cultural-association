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

  const raw = {
    amount: formData.get("amount") as string,
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,
    address1: formData.get("address1") as string,
    address2: formData.get("address2") as string,
    suburb: formData.get("suburb") as string,
    state: formData.get("state") as string,
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

  return {
    ok: true,
    message: "Thanks for your donation! 🎉",
    data,
  };
}
