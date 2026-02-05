import Stripe from "stripe";
import type { PaymentType } from "./stripePayment.public";

export type WebhookMeta = {
  userId: number;
  paymentType: PaymentType;
  paymentRowId: number;
  paymentKey: string;
};

export const getEventMetadata = (event: Stripe.Event) => {
  // eslint-disable-next-line
  const obj: any = event.data.object as any;

  if (obj?.metadata && typeof obj.metadata === "object") return obj.metadata;

  // invoice case you logged earlier: parent.subscription_details.metadata
  const nested = obj?.parent?.subscription_details?.metadata;
  if (nested && typeof nested === "object") return nested;

  return {};
};
