import { PAYMENT_PLANS } from "./constant";
export type PaymentPlans = (typeof PAYMENT_PLANS)[number];
export type MembershipOption = {
  id: string;
  label: string;
  priceLabel: string;
  helper: string;
};

export type PaymentMetaData = {
  paymentRowId: string;
  plan: string;
  userId: string;
};
