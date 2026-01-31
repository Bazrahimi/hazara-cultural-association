export const PAYMENT_FIELDS = {
  plan: "plan",
  feeWaived: "feeWaived",
  waiverReason: "waiverReason",
};


export const PRICES = {
  monthly: { amountCents: 1000, label: "HCA Membership (Monthly)" },
  annual: { amountCents: 11500, label: "HCA Membership (Annual)" },
} as const;


export const MEMBERSHIP_OPTIONS = [
  {
    id: "monthly",
    label: "Monthly membership",
    priceLabel: "$10 / month",
    helper: "Ongoing membership billed monthly. Cancel any time.",
  },
  {
    id: "annual",
    label: "Annual membership",
    priceLabel: "$115 / year",
    helper: "One payment for 12 months. Best value for regular members.",
  },
] as const;