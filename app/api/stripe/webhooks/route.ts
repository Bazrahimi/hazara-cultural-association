// app/api/stripe/webhooks/route.ts
import { stripe } from "@/app/_lib/stripe/stripe";
import Stripe from "stripe";

import { serverEnv } from "@/app/_lib/env/server";
import { PaymentType } from "@/app/_lib/stripe/stripePayment.public";
import { getEventMetadata } from "@/app/_lib/stripe/webhookMeta";
import {
  handleDonationEvent,
  handleMembershipEvent,
} from "@/app/members/auth/join/checkout/_lib/data";

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature)
    return new Response("Missing Stripe signature", { status: 400 });

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

  console.log(
    "event.type:",
    event.type,
    "object",
    // eslint-disable-next-line
    (event.data.object as any).object,
  );

  try {
    const meta = getEventMetadata(event);
    if (meta?.paymentType === ("membership" as PaymentType)) {
      await handleMembershipEvent(event);
    } else if (meta?.paymentType === ("donation" as PaymentType)) {
      await handleDonationEvent(event);
    } else {
      console.log("ℹ️ No paymentType metadata, ignored");
    }
  } catch (err) {
    console.error("❌ Webhook handler failed", err);
    return new Response("Webhook failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
};
