import z from "zod";
import { DonationState } from "./definitions";
import { DonationSchema } from "./schema";

export const submitDonation = async (
  prevState: DonationState | undefined,
  formData: FormData
) => {
  const rawData = {
    amount: Number(formData.get("amount")),
    fullName: formData.get("fullName") as string,
    contactNumber: Number(formData.get("contactNumber")),
    address: formData.get("address") as string,
    suburb: formData.get("suburb") as string,
    state: formData.get("state") as string,
    postCode: formData.get("postCode") as string,
    creditCard: formData.get("creditCard"),
  };

  const validated = DonationSchema.safeParse({
    amount: rawData.amount,
    fullName: rawData.fullName,
    contactNumber: rawData.contactNumber,
    address: rawData.address,
    suburb: rawData.suburb,
    state: rawData.state,
    postCode: rawData.postCode,
    creditCard: rawData.creditCard,
  });

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    return {
      ...rawData,
      ok: false,
      message: "Complete teh above fields",
      errors: {
        amount: tree.properties?.amount?.errors,
        fullName: tree.properties?.fullName?.errors,
        contactNumber: tree.properties?.contactNumber?.errors,
        address: tree.properties?.address?.errors,
        suburb: tree.properties?.suburb?.errors,
        state: tree.properties?.state?.errors,
        postCode: tree.properties?.postCode?.errors,
        creditCard: tree.properties?.creditCard?.errors,
      },
    };
  }

  const data = validated.data
};
