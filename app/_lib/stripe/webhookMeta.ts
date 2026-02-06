import Stripe from "stripe";
import type { PaymentType } from "./stripePayment.public";

export type WebhookMeta = {
  userId: number;
  paymentType: PaymentType;
  paymentRowId: number;
  paymentPlanKey: string;
};

type PaymentMetaResult = {
  rowId: number;
  userId: number;
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

export const getPaymentMeta = (
  meta: Stripe.Metadata,
  context: string,
  objectId: string,
): PaymentMetaResult => {
  const rowIdRaw = meta?.paymentRowId;
  const userIdRaw = meta?.userId;

  if (!rowIdRaw || !userIdRaw) {
    throw new Error(
      `${context} missing metadata.paymentRowId/userId (object ${objectId})`,
    );
  }

  const rowId = Number(rowIdRaw);
  const userId = Number(userIdRaw);

  if (!Number.isFinite(rowId) || !Number.isFinite(userId)) {
    throw new Error(
      `${context} invalid metadata.paymentRowId/userId (object ${objectId})`,
    );
  }

  return { rowId, userId };
};
