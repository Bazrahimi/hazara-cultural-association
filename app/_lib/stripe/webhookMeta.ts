import type { PaymentType } from "./stripePayment";

export type WebhookMeta = {
  paymentType: PaymentType;
  userId: number;
  paymentRowId: number;
  paymentKey: string;
};
