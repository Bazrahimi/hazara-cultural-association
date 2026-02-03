import { PaymentType } from "@/app/_lib/stripe/stripePayment";
import { PAYMENT_PLANS } from "./constant";
export type PaymentPlans = (typeof PAYMENT_PLANS)[number];
export type MembershipOption = {
  id: string;
  label: string;
  priceLabel: string;
  helper: string;
};

export type PaymentMetaData = {
  paymentType: PaymentType;
  userId: number;
  paymentRowId: number;
  paymentPlan: string;
};
