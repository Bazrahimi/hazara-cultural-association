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
  [membership.monthly.paymentKey]: process.env.STRIPE_PRICE_MEMBERSHIP_MONTHLY!,
  [membership.annual.paymentKey]: process.env.STRIPE_PRICE_MEMBERSHIP_YEARLY!,
} as const;

export type MembershipPlan = keyof typeof membership;
