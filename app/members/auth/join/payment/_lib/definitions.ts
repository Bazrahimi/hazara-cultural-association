import { PAYMENT_KEY } from "./constant";
export type PaymentKey = (typeof PAYMENT_KEY)[number];
export type MembershipOption = {
  id: string;
  label: string;
  priceLabel: string;
  helper: string;
};
