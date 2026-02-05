import type { PaymentType } from "./stripePayment.public";

export type WebhookMeta = {
  userId: number;
  paymentType: PaymentType;
  paymentRowId: number;
  paymentKey: string;
};

// export const extractWebhookMeta = (event: Stripe.Event): WebhookMeta | null => {
//   // eslint-disable-next-line
//   const obj: any = event.data.object;

//   const sm: WebhookMeta = obj?.metadata;
//   if (sm?.userId && sm?.paymentType && sm?.paymentRowId && sm?.paymentKey) {
//     const { userId, paymentType, paymentRowId, paymentKey } = sm;

//     if (!userId || !paymentRowId) return null;

//     return {
//       userId: userId,
//       paymentType: paymentType,
//       paymentRowId: paymentRowId,
//       paymentKey: paymentKey,
//     };
//   }

//   // Invoice
//   // 2) Invoice (your logs show this is present)
//   const invoiceMeta = obj?.parent?.subscription_details?.metadata;
//   if (
//     invoiceMeta?.paymentType &&
//     invoiceMeta?.userId &&
//     invoiceMeta?.paymentRowId
//   ) {
//     const userId = invoiceMeta.userId;
//     const paymentRowId = invoiceMeta.paymentRowId;
//     if (!userId || !paymentRowId) return null;

//     return {
//       paymentType: invoiceMeta.paymentType,
//       userId,
//       paymentRowId,
//       paymentKey: invoiceMeta.paymentPlansKey,
//     };
//   }

//   return null;
// };
