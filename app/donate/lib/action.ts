"use server";

import { toActionErrors } from "@/app/_lib/actionHelper";
import {processEnv} from "@/app/_lib/processEnv"
import { stripe } from "@/app/_lib/stripe/stripe";
import { redirect } from "next/navigation";
import type Stripe from "stripe"; // ✅ add this
import { DonationSchema, type DonationState } from "./schema";
import { STRIPE_SESSION_QUERY as ssq } from "@/app/_lib/stripe/stripe";

export async function submitDonation(
  _prev: DonationState | undefined,
  formData: FormData,
): Promise<DonationState | never> {
  const rawData: Record<string, unknown> = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : undefined,
    ]),
  );

  const parsed = DonationSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      ...toActionErrors<DonationState["errors"]>(parsed.error),
      data: rawData,
    };
  }

  const data = parsed.data;
  const unitAmount = Math.round(Number(data.amount) * 100);

  const successUrl = `${processEnv.baseUrl}?${ssq}`;
  const cancelUrl = `${processEnv.baseUrl}/donate/cancel`;

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
    // billing_address_collection: "required",
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
