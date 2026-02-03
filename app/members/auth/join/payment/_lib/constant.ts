import { STRIPE_PAYMENT as sp } from "@/app/_lib/stripe/stripePayment";
import { MembershipOption } from "./definitions";

export const PAYMENT_PLANS_KEY = [
  sp.membership.monthly.key,
  sp.membership.annual.key,
] as const;

export const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    id: sp.membership.monthly.key,
    label: "Monthly membership",
    priceLabel: "$10 / Month",
    helper: "Ongoing membership billed monthly. Cancel any time.",
  },
  {
    id: sp.membership.annual.key,
    label: "Annual membership",
    priceLabel: "$115 / Year",
    helper: "One payment for 12 months. Best value for regular members.",
  },
] as const;

export const PAYMENT_FIELDS = {
  paymentPlansKey: "paymentPlansKey",
  feeWaived: "feeWaived",
  waiverReason: "waiverReason",
} as const;
