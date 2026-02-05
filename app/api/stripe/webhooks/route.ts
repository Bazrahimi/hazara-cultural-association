// app/api/stripe/webhooks/route.ts
import { stripe } from "@/app/_lib/stripe/stripe";
import Stripe from "stripe";

import { serverEnv } from "@/app/_lib/env/server";
import {
  handleDonationEvent,
  handleMembershipEvent,
} from "@/app/members/auth/join/payment/_lib/data";

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

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

  console.log("event.type_____________", event.type);

  try {
    const subscription = event.data.object as Stripe.Subscription;
    const metadata = subscription.metadata;
    switch (metadata?.paymentType) {
      case "membership":
        await handleMembershipEvent(subscription, event.type);
        break;

      case "donation":
        await handleDonationEvent(subscription);
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
