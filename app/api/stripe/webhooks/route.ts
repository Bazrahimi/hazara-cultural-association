// app/api/stripe/webhooks/route.ts
import { stripe } from "@/app/_lib/stripe/stripe";
import Stripe from "stripe";

import { serverEnv } from "@/app/_lib/env/server";
import { extractWebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import { headers } from "next/headers";

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      serverEnv.stripe.webhookSecret,
    );
  } catch (error) {
    console.error("❌ Invalid signature", error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    const meta = extractWebhookMeta(event);
    switch (meta?.paymentType) {
      case "membership":
        break;

      default:
        break;
    }
  } catch (err) {
    console.error("❌ Webhook handler failed", err);
    return new Response("Webhook failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
};

// NOTE: Stripe CLI must be running in the background if we want Stripe webhook event to reach
