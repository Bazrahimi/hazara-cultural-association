import { MembershipOption } from "./definitions";
import { PaymentBooleanKey } from "./schema";

export const PAYMENT_PLANS = ["monthly", "annual"] as const;

export const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    id: PAYMENT_PLANS[0],
    label: "Monthly membership",
    priceLabel: "$10 / Month",
    helper: "Ongoing membership billed monthly. Cancel any time.",
  },
  {
    id: PAYMENT_PLANS[1],
    label: "Annual membership",
    priceLabel: "$115 / Year",
    helper: "One payment for 12 months. Best value for regular members.",
  },
] as const;

export const PAYMENT_FIELDS = {
  plan: "plan",
  feeWaived: "feeWaived",
  waiverReason: "waiverReason",
} as const;

export const PAYMENT_BOOLEAN_FIELDS = [
  "feeWaived",
] as const satisfies readonly PaymentBooleanKey[];