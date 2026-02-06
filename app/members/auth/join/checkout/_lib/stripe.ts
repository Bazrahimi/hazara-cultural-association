import { publicEnv } from "@/app/_lib/env/public";
import { MemberRoutes } from "@/app/_lib/routes";
import { STRIPE_SESSION_QUERY as ssq, stripe } from "@/app/_lib/stripe/stripe";
import {
  getRowIdFromMeta,
  getUserIdFromMeta,
  type WebhookMeta,
} from "@/app/_lib/stripe/webhookMeta";
import Stripe from "stripe";
import { updateMembershipPaymentRow, upsertMemberSubscription } from "./data";
import type {
  PaymentKey,
  UpdateMembershipPaymentRow,
  UpsertMemberSubscription,
} from "./definitions";

export async function createMembershipCheckoutSession(params: {
  paymentPlansKey: PaymentKey;
  priceId: string;
  metadata: WebhookMeta;
  customerEmail: string;
}) {

  
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    customer_email: params.customerEmail,
    success_url: `${publicEnv.baseUrl}${MemberRoutes.paymentSuccess()}?${ssq}`,
    cancel_url: `${publicEnv.baseUrl}${MemberRoutes.paymentCancel()}`,
    metadata: params.metadata,
    subscription_data: {
      metadata: params.metadata,
    },
  });

  return checkout;
}

const toId = (val: unknown): string | null => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (
    typeof val === "object" &&
    // eslint-disable-next-line
    "id" in (val as any) &&
    // eslint-disable-next-line
    typeof (val as any).id === "string"
  ) {
    // eslint-disable-next-line
    return (val as any).id;
  }
  return null;
};

export const handleSubscriptionCreated = async (sub: Stripe.Subscription) => {
  console.log("customer.subscription.created____________:", sub);
  const { userId } = getUserIdFromMeta(
    sub.metadata,
    "customer.subscription.created",
    sub.id,
  );

  const firstItem = sub.items?.data?.[0];
  // eslint-disable-next-line
  const subAny = sub as any;

  const upsertPayload: UpsertMemberSubscription = {
    userId,

    stripeCustomerId: toId(sub.customer),
    stripeSubscriptionId: sub.id,

    stripePriceId: firstItem?.price?.id ?? null,
    stripeProductId: toId(firstItem?.price?.product),

    status: sub.status ?? null,
    collectionMethod: sub.collection_method ?? null,
    currency: sub.currency ?? null,

    billingCycleAnchor: sub.billing_cycle_anchor ?? null,
    currentPeriodStart: subAny.current_period_start ?? null,
    currentPeriodEnd: subAny.current_period_end ?? null,

    cancelAtPeriodEnd: sub.cancel_at_period_end ?? null,
    canceledAt: sub.canceled_at ?? null,
    cancelAt: sub.cancel_at ?? null,

    defaultPaymentMethodId: toId(sub.default_payment_method),
    latestInvoiceId: toId(sub.latest_invoice),
  };

  await upsertMemberSubscription(upsertPayload);

  return { ok: true, ...upsertPayload };
};

export const handleCheckoutCompleted = async (cs: Stripe.Checkout.Session) => {
  const { rowId } = getRowIdFromMeta(
    cs.metadata,
    "checkout.session.completed",
    cs.id,
  );

  const updatePayload: UpdateMembershipPaymentRow = {
    id: rowId,
    status: "redirected",
    stripeCustomerId: toId(cs.customer),
    stripeSubscriptionId: toId(cs.subscription),
    stripeInvoiceId: toId(cs.invoice),
  };

  await updateMembershipPaymentRow(updatePayload);

  return {
    ok: true,
    ...updatePayload,
  };
};
