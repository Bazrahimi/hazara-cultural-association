"use server";
import { stripe } from "@/app/lib/stripe";
import Stripe from "stripe";

import { Checkout, CheckoutSchema, CheckoutState, FieldErrors } from "./schema";

export const processCheckoutPayment = async (
  _prev: CheckoutState | undefined,
  formData: FormData
) => {
  const raw = {
    amount: formData.get("amount"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    suburb: formData.get("suburb"),
    stateCode: formData.get("stateCode"),
    postCode: formData.get("postCode"),
  };

  const parsed = CheckoutSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors as FieldErrors<Checkout>;
    return {
      ok: false,
      message: "Please fix the errors above.",
      errors: fe,
      data: {
        firstName: String(raw.firstName ?? ""),
        lastName: String(raw.lastName ?? ""),
        email: String(raw.email ?? ""),
        contactNumber: String(raw.contactNumber ?? ""),
        address1: String(raw.address1 ?? ""),
        address2: String(raw.address2 ?? ""),
        suburb: String(raw.suburb ?? ""),
        stateCode: String(raw.stateCode ?? ""),
        postCode: raw.postCode ? Number(raw.postCode) : undefined,
      },
    };
  }
  const data = parsed.data;
  const unitAmount = Math.round(Number(data.amount) * 100);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return {
      ok: false,
      message: "Configuration error: NEXT_PUBLIC_BASE_URL is not set.",
    };
  }
  const successUrl = `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}/donate/cancel`;

  const address: Stripe.AddressParam = {
    line1: data.address1,
    line2: data.address2 || undefined,
    city: data.suburb,
    state: data.stateCode,
    postal_code: String(data.postCode),
    country: "AU",
  };

  // Optional but recommended: upsert a Customer so receipts show "Billed to"
  const existing = await stripe.customers.list({ email: data.email, limit: 1 });
  const customer =
    existing.data[0] ??
    (await stripe.customers.create({
      name: data.fullName,
      email: data.email,
      phone: data.contactNumber || undefined,
      address,
    }));

  if (existing.data[0]) {
    await stripe.customers.update(existing.data[0].id, {
      name: data.fullName,
      phone: data.contactNumber || undefined,
      address,
    });
  }
};
