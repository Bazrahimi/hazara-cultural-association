import { FieldErrors } from "@/app/lib/definitions";
import { DonationState } from "./definitions";
import { Donation, DonationSchema } from "./schema";

/** 3) Server action */
export async function submitDonation(
  _prev: DonationState | undefined,
  formData: FormData
): Promise<DonationState> {
  // Gather raw values from the form
  const raw = {
    amount: formData.get("amount"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber") ?? "",
    address1: formData.get("address1") ?? "",
    address2: formData.get("address2") ?? "",
    suburb: formData.get("suburb") ?? "",
    state: formData.get("state") ?? "",
    postCode: formData.get("postCode"),
    creditCard: !!formData.get("creditCard"), // checkbox => "on" | null
  };

  const parsed = DonationSchema.safeParse(raw);

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fe as FieldErrors<Donation>,
      // return some data to keep fields sticky
      data: {
        fullName: String(raw.fullName ?? ""),
        email: String(raw.email ?? ""),
        contactNumber: String(raw.contactNumber ?? ""),
        address: String(raw.address2 ?? ""),
        suburb: String(raw.suburb ?? ""),
        state: String(raw.state ?? ""),
        // amount / postCode are coerced; you can include them too if you like
      },
    };
  }

  const data = parsed.data;



  return {
    ok: true,
    message: "Thanks for your donation! 🎉",
    data,
  };
}
