import Stripe from "stripe";
import type { PaymentType } from "./stripePayment.public";

export type WebhookMeta = {
  userId: number;
  paymentType: PaymentType;
  paymentRowId: number;
  paymentPlanKey: string;
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

export const getRowIdFromMeta = (
  meta: Stripe.Metadata | null,
  context: string,
  objectId: string,
): { rowId: number } => {
  const rowIdRaw = meta?.paymentRowId;

  if (!rowIdRaw) {
    throw new Error(
      `${context} missing metadata.paymentRowId/userId (object ${objectId})`,
    );
  }

  const rowId = Number(rowIdRaw);

  if (!Number.isFinite(rowId)) {
    throw new Error(
      `${context} invalid metadata.paymentRowId/userId (object ${objectId})`,
    );
  }

  return { rowId };
};

export const getUserIdFromMeta = (
  meta: Stripe.Metadata | null,
  context: string,
  objectId: string,
): { userId: number } => {
  const userIdRaw = meta?.userId;

  if (!userIdRaw) {
    throw new Error(
      `${context} missing metadata.paymentRowId/userId (object ${objectId})`,
    );
  }

  const userId = Number(userIdRaw);

  if (!Number.isFinite(userId)) {
    throw new Error(
      `${context} invalid metadata.paymentRowId/userId (object ${objectId})`,
    );
  }

  return { userId };
};
