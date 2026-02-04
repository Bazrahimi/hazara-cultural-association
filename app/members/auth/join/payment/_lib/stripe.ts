import { processEnv } from "@/app/_lib/processEnv";
import { MemberRoutes } from "@/app/_lib/routes";
import { STRIPE_SESSION_QUERY as ssq, stripe } from "@/app/_lib/stripe/stripe";
import type { WebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import Stripe from "stripe";
import {
  getMembershipPaymentStatus,
  markMembershipPaymentPaid,
  setUserMembershipActive,
} from "./data";
import type { PaymentKey } from "./definitions";

export async function createMembershipCheckoutSession(params: {
  paymentPlansKey: PaymentKey;
  priceId: string;
  metadata: WebhookMeta;
  customerEmail: string;
}) {
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    customer_email: params.customerEmail,
    success_url: `${processEnv.baseUrl}${MemberRoutes.paymentSuccess()}?${ssq}`,
    cancel_url: `${processEnv.baseUrl}${MemberRoutes.paymentCancel()}`,
    metadata: params.metadata,
    subscription_data: {
      metadata: params.metadata,
    },
  });

  return checkout;
}

