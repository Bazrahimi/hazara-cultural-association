import { STRIPE_PAYMENT as sp } from "@/app/_lib/stripe/stripePayment";
import { MembershipOption } from "./definitions";

export const PAYMENT_KEY = [
  sp.membership.monthly.paymentKey,
  sp.membership.annual.paymentKey,
] as const;

export const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    id: sp.membership.monthly.paymentKey,
    label: "Monthly membership",
    priceLabel: `$${sp.membership.monthly.amountCents / 100} / Month`,
    helper: "Ongoing membership billed monthly. Cancel any time.",
  },
  {
    id: sp.membership.annual.paymentKey,
    label: "Annual membership",
    priceLabel: `$${sp.membership.annual.amountCents / 100} / Year`,
    helper: "One payment for 12 months. Best value for regular members.",
  },
] as const;

export const PAYMENT_FIELDS = {
  paymentKey: "paymentKey",
  feeWaived: "feeWaived",
  waiverReason: "waiverReason",
} as const;
