// app/_lib/stripe/stripePayment.server.ts
import "server-only";
import { serverEnv } from "@/app/_lib/env/server";
import { membership } from "./stripePayment.public";


export const STRIPE_PAYMENT_ID = {
  [membership.monthly.paymentKey]: serverEnv.stripe.prices.membershipMonthly,
  [membership.annual.paymentKey]: serverEnv.stripe.prices.membershipYearly,
} as const;
