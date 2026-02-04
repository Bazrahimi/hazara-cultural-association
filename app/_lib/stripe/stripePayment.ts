import { processEnv } from "../processEnv";

const membership = {
  monthly: {
    paymentKey: "membership-monthly-fee",
    amountCents: 1000,
    currency: "aud",
  },
  annual: {
    paymentKey: "membership-annual-fee",
    amountCents: 11500,
    currency: "aud",
  },
};

export const STRIPE_PAYMENT = {
  membership: membership,
  donation: {},
} as const;

export type PaymentType = keyof typeof STRIPE_PAYMENT;

export const STRIPE_PAYMENT_ID = {
  [membership.monthly.paymentKey]: processEnv.stripe.payment.membership.monthly,
  [membership.annual.paymentKey]: processEnv.stripe.payment.membership.annual,
} as const;

export type MembershipPlan = keyof typeof membership;
