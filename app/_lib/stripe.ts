//app/_lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET!;
export const STRIPE_SIGNATURE = "stripe-signature";

export const MEMBER_PRICE_ID = {
  monthly: process.env.STRIPE_PRICE_MEMBERSHIP_MONTHLY!,
  annual: process.env.STRIPE_PRICE_MEMBERSHIP_YEARLY!,
} as const;

export const EVENT_TYPE = {
  sessionCompleted: "checkout.session.completed",
  paymentFailed: "invoice.payment_failed"
};
