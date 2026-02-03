import { requiredEnv } from "../helper";

const membership = {
  monthly: {
    key: "membership-monthly-fee",
    priceId: requiredEnv("STRIPE_PRICE_MEMBERSHIP_MONTHLY"),
    amountCents: 1000,
    currency: "aud",
  },
  annual: {
    key: "membership-annual-fee",
    priceId: requiredEnv("STRIPE_PRICE_MEMBERSHIP_YEARLY"),
    amountCents: 11500,
    currency: "aud",
  },
};

export const STRIPE_PAYMENT = {
  membership: membership,
} as const;

export type MembershipPlan = keyof typeof membership;