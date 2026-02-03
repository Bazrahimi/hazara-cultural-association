// app/api/stripe/webhooks/route.ts
import { stripe, stripeWebhookSecret } from "@/app/_lib/stripe";
import Stripe from "stripe";

import {
  handleCheckoutCompleted,
  handleInvoice,
  handleInvoiceFailed,
  handleInvoicePaymentPaid,
} from "@/app/members/auth/join/payment/_lib/stripe";
import { headers } from "next/headers";

export const POST = async (req: Request) => {
  const body = await req.text();
  console.log("body______________", body);

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // TODO: in here can we get the productId or name subscription.plan.product. the reason i need that because i need run the switch based on event and payment product
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret,
    );
  } catch (error) {
    console.error("❌ Invalid signature", error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);

        break;
      case "invoice.paid":
        await handleInvoice(event.data.object);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object);
        break;

      // Payment-based invoice events (what you are receiving)
      case "invoice_payment.paid":
        await handleInvoicePaymentPaid(
          event.data.object as Stripe.InvoicePayment,
        );
        break;
      default:
        console.log("ℹ️ Ignored event:", event.type);
    }
  } catch (err) {
    console.error("❌ Webhook handler failed", err);
    return new Response("Webhook failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
};

// NOTE: Stripe CLI must be running in the background if we want Stripe webhook event to reach
