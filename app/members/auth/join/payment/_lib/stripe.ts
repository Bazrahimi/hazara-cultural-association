import { baseUrl } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { stripe } from "@/app/_lib/stripe";
import { PaymentPlans } from "./definitions";

export const MEMBERSHIP_PAYMENT_ID = {
  monthly: process.env.STRIPE_PRICE_MEMBERSHIP_MONTHLY!,
  annual: process.env.STRIPE_PRICE_MEMBERSHIP_YEARLY!,
} as const;

export async function createMembershipCheckoutSession(params: {
  plan: PaymentPlans;
  priceId: string;
  metadata: Record<string, string>;
  customerEmail: string;
}) {
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    customer_email: params.customerEmail,
    success_url: `${baseUrl}${MemberRoutes.paymentSuccess()}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}${MemberRoutes.paymentCancel()}`,
    metadata: params.metadata,
    subscription_data: {
      metadata: params.metadata,
    },
  });

  return checkout;
}
