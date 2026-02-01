import { stripe, stripeWebhook } from "@/app/_lib/stripe";
import Stripe from "stripe";

import { headers } from "next/headers";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

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

  const session = event.data.object as Stripe.Checkout.Session;

  console.log("session_________", session);

  const userId = Number(session.metadata?.userId);
  console.log("userId____________", userId);
  const paymentRowId = Number(session.metadata?.paymentRowId);
  console.log("paymentRowId_________________", paymentRowId);

  // if (!userId || !paymentRowId) {
  //   console.warn("Missing metadata", session.id);
  //   break;
  // }

  //  try {
  //   switch (event.type) {

  //     case EVENT_TYPE.checkoutCompleted: {
  //       const session = event.data.object as Stripe.Checkout.Session;

  //       const userId = Number(session.metadata?.userId);
  //       const paymentRowId = Number(session.metadata?.paymentRowId);

  //       if (!userId || !paymentRowId) {
  //         console.warn("Missing metadata", session.id);
  //         break;
  //       }

  //       await sql`
  //         UPDATE membership_payments
  //         SET
  //           stripe_checkout_session_id = ${session.id},
  //           stripe_subscription_id = ${session.subscription as string},
  //           stripe_customer_id = ${session.customer as string},
  //           status = 'redirected',
  //           updated_at = now()
  //         WHERE id = ${paymentRowId}
  //       `;

  //       break;
  //     }

  //     case EVENT_TYPE.invoicePaid: {
  //       const invoice = event.data.object as Stripe.Invoice;

  //       const subscriptionId = invoice.subscription as string;

  //       await sql`
  //         UPDATE membership_payments
  //         SET
  //           status = 'paid',
  //           stripe_payment_intent_id = ${invoice.payment_intent as string},
  //           updated_at = now()
  //         WHERE stripe_subscription_id = ${subscriptionId}
  //       `;

  //       await sql`
  //         UPDATE user_profiles
  //         SET membership_status = 'active'
  //         WHERE user_id = (
  //           SELECT user_id
  //           FROM membership_payments
  //           WHERE stripe_subscription_id = ${subscriptionId}
  //         )
  //       `;

  //       break;
  //     }

  //     case EVENT_TYPE.invoicePaymentFailed: {
  //       const invoice = event.data.object as Stripe.Invoice;

  //       await sql`
  //         UPDATE membership_payments
  //         SET
  //           status = 'failed',
  //           updated_at = now()
  //         WHERE stripe_subscription_id = ${invoice.subscriptionId as string}
  //       `;

  //       console.warn("❌ Invoice payment failed", invoice.id);
  //       break;
  //     }
  //   }
  // } catch (err) {
  //   console.error("Webhook handler error", err);
  //   return new Response("Webhook handler failed", { status: 500 });
  // }

  return new Response("OK", { status: 200 });
};
