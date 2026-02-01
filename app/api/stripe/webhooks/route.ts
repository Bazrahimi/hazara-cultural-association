import { sql } from "@/app/_lib/db";
import {
  EVENT_TYPE,
  stripe,
  STRIPE_SIGNATURE,
  stripeWebhook,
} from "@/app/_lib/stripe";
import Stripe from "stripe";

import { headers } from "next/headers";

export const Post = async (req: Request) => {
  const body = await req.text();
  const signature = (await headers()).get(STRIPE_SIGNATURE);

  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhook);
  } catch (err) {
    console.error("❌ Webhook signature verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case EVENT_TYPE.sessionCompleted: {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = Number(session.metadata?.userId);
        const paymentRowId = Number(session.metadata?.paymentRowId);

        // Mark payment successful
        await sql`
          UPDATE membership_payments
          SET
            status = 'paid',
            stripe_subscription_id = ${session.subscription},
            stripe_customer_id = ${session.customer},
            updated_at = now()
          WHERE id = ${paymentRowId}
        `;

        // Activate membership
        await sql`
          UPDATE user_profiles
          SET membership_status = 'active'
          WHERE user_id = ${userId}
        `;

        break;
      }
      case EVENT_TYPE.paymentFailed: {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn("❌ Invoice payment failed", invoice.id);
        break;
      }

      // default:
      //   break;
    }
  } catch (err) {
    console.error("Webhook handler error", err);
    return new Response("Webhook handler failed", { status: 500 });
  }
  return new Response("OK", { status: 200 });
};
