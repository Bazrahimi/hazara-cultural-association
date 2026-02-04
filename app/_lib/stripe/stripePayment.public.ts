export const membership = {
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

export type MembershipPlan = keyof typeof membership;

export type MembershipPaymentKey =
  (typeof membership)[MembershipPlan]["paymentKey"];
