"use server";

import { stripe } from "@/app/lib/stripe";
import { redirect } from "next/navigation";
import type Stripe from "stripe"; // ✅ add this
import {
  DonationSchema,
  type Donation,
  type DonationState,
  type FieldErrors,
} from "./schema";

export async function submitDonation(
  _prev: DonationState | undefined,
  formData: FormData
): Promise<DonationState | never> {
  const raw = {
    amount: formData.get("amount"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    suburb: formData.get("suburb"),
    stateCode: formData.get("stateCode"),
    postCode: formData.get("postCode"),
  };

  const parsed = DonationSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors as FieldErrors<Donation>;
    return {
      ok: false,
      message: "Please fix the errors above.",
      errors: fe,
      data: {
        fullName: String(raw.fullName ?? ""),
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

  // ✅ Type now resolves because of `import type Stripe from "stripe"`
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

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customer.id, // ✅ ties to customer (name/address on receipt)
    billing_address_collection: "required", // ✅ ask/confirm billing address
    customer_update: { name: "auto", address: "auto" },

    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Donation (test-mode)",
            description: `Donation from (test-mode) ${data.fullName}`,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],

    // Note: metadata is internal; won't appear on receipts
    metadata: {
      fullName: data.fullName,
      contactNumber: data.contactNumber ?? "",
      address1: data.address1,
      address2: data.address2 ?? "",
      suburb: data.suburb,
      state: data.stateCode,
      postCode: String(data.postCode),
      amount: String(data.amount),
    },

    allow_promotion_codes: false,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  if (!session.url) {
    return {
      ok: false,
      message: "Unable to start payment session. Please try again.",
    };
  }

  redirect(session.url);
}
