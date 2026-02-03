import { PaymentType } from "@/app/_lib/stripe/stripePayment";
import { PAYMENT_PLANS_KEY } from "./constant";
export type PaymentPlansKey = (typeof PAYMENT_PLANS_KEY)[number];
export type MembershipOption = {
  id: string;
  label: string;
  priceLabel: string;
  helper: string;
};

export type MetaData = {
  paymentType: PaymentType;
  userId: number;
  paymentRowId: number;
  paymentPlansKey: string;
};
