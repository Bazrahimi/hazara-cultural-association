import { publicEnv } from "@/app/_lib/env/public";
import { MemberRoutes } from "@/app/_lib/routes";
import { STRIPE_SESSION_QUERY as ssq, stripe } from "@/app/_lib/stripe/stripe";
import type { WebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import Stripe from "stripe";
import { updateMembershipPaymentRow } from "./data";
import type { PaymentKey } from "./definitions";

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

export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  const meta = session.metadata ?? {};
  const rowIdRaw = meta.paymentRowId;

  if (!rowIdRaw) {
    throw new Error(
      `checkout.session.completed missing metadata.paymentRowId (session ${session.id})`,
    );
  }

  const rowId = Number(rowIdRaw);
  if (!Number.isFinite(rowId)) {
    throw new Error(
      `Invalid metadata.paymentRowId "${rowIdRaw}" on session ${session.id}`,
    );
  }

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  const invoiceId =
    typeof session.invoice === "string" ? session.invoice : session.invoice?.id;

  await updateMembershipPaymentRow({
    rowId,
    customerId: customerId ?? "", // or allow null in your update fn
    subscriptionId: subscriptionId ?? "",
    invoiceId: invoiceId ?? null,
    status: "redirected",
  });

  return { rowId, customerId, subscriptionId, invoiceId };
};

// helper: convert Stripe expandable to id
const toId = (val: unknown): string | null => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (
    typeof val === "object" &&
    val &&
    "id" in val &&
    typeof (val as any).id === "string"
  ) {
    return (val as any).id;
  }
  return null;
};

export const handleSubcriptionCreated = async (sub: Stripe.Subscription) => {
  // ✅ userId from metadata (you already set this)
  const userIdRaw = sub.metadata?.userId;
  if (!userIdRaw) {
    throw new Error(
      `subscription.created missing metadata.userId (sub ${sub.id})`,
    );
  }
  const userId = Number(userIdRaw);
  if (!Number.isFinite(userId)) {
    throw new Error(
      `Invalid metadata.userId "${userIdRaw}" on subscription ${sub.id}`,
    );
  }

  const stripeSubscriptionId = sub.id;
  const stripeCustomerId = toId(sub.customer);

  // Price/Product (best effort from subscription items)
  const firstItem = sub.items?.data?.[0];
  const stripePriceId = toId(firstItem?.price);
  const stripeProductId = toId(firstItem?.price?.product);

  const status = sub.status ?? null;
  const collectionMethod = sub.collection_method ?? null;
  const currency = sub.currency ?? null;

  const billingCycleAnchor = sub.billing_cycle_anchor ?? null;

  // These may be undefined depending on API version / event expansion
  const currentPeriodStart = (sub as any).current_period_start ?? null;
  const currentPeriodEnd = (sub as any).current_period_end ?? null;

  const cancelAtPeriodEnd = sub.cancel_at_period_end ?? null;
  const canceledAt = sub.canceled_at ?? null;
  const cancelAt = sub.cancel_at ?? null;

  const defaultPaymentMethodId = toId(sub.default_payment_method);
  const latestInvoiceId = toId(sub.latest_invoice);

  // ✅ Upsert into member_subscriptions by stripe_subscription_id
  // (assumes stripe_subscription_id is UNIQUE as per table design)
  const rows = await sql<{ id: number }[]>`
    INSERT INTO public.member_subscriptions (
      user_id,
      stripe_customer_id,
      stripe_subscription_id,
      stripe_price_id,
      stripe_product_id,
      status,
      collection_method,
      currency,
      billing_cycle_anchor,
      current_period_start,
      current_period_end,
      cancel_at_period_end,
      canceled_at,
      cancel_at,
      default_payment_method_id,
      latest_invoice_id,
      updated_at
    )
    VALUES (
      ${userId},
      ${stripeCustomerId},
      ${stripeSubscriptionId},
      ${stripePriceId},
      ${stripeProductId},
      ${status},
      ${collectionMethod},
      ${currency},

      CASE WHEN ${billingCycleAnchor} IS NULL THEN NULL ELSE to_timestamp(${billingCycleAnchor}) END,
      CASE WHEN ${currentPeriodStart} IS NULL THEN NULL ELSE to_timestamp(${currentPeriodStart}) END,
      CASE WHEN ${currentPeriodEnd} IS NULL THEN NULL ELSE to_timestamp(${currentPeriodEnd}) END,

      ${cancelAtPeriodEnd},
      CASE WHEN ${canceledAt} IS NULL THEN NULL ELSE to_timestamp(${canceledAt}) END,
      CASE WHEN ${cancelAt} IS NULL THEN NULL ELSE to_timestamp(${cancelAt}) END,

      ${defaultPaymentMethodId},
      ${latestInvoiceId},
      NOW()
    )
    ON CONFLICT (stripe_subscription_id)
    DO UPDATE SET
      user_id                  = EXCLUDED.user_id,
      stripe_customer_id        = COALESCE(EXCLUDED.stripe_customer_id, public.member_subscriptions.stripe_customer_id),
      stripe_price_id           = COALESCE(EXCLUDED.stripe_price_id, public.member_subscriptions.stripe_price_id),
      stripe_product_id         = COALESCE(EXCLUDED.stripe_product_id, public.member_subscriptions.stripe_product_id),
      status                   = COALESCE(EXCLUDED.status, public.member_subscriptions.status),
      collection_method        = COALESCE(EXCLUDED.collection_method, public.member_subscriptions.collection_method),
      currency                 = COALESCE(EXCLUDED.currency, public.member_subscriptions.currency),
      billing_cycle_anchor     = COALESCE(EXCLUDED.billing_cycle_anchor, public.member_subscriptions.billing_cycle_anchor),
      current_period_start     = COALESCE(EXCLUDED.current_period_start, public.member_subscriptions.current_period_start),
      current_period_end       = COALESCE(EXCLUDED.current_period_end, public.member_subscriptions.current_period_end),
      cancel_at_period_end     = COALESCE(EXCLUDED.cancel_at_period_end, public.member_subscriptions.cancel_at_period_end),
      canceled_at              = COALESCE(EXCLUDED.canceled_at, public.member_subscriptions.canceled_at),
      cancel_at                = COALESCE(EXCLUDED.cancel_at, public.member_subscriptions.cancel_at),
      default_payment_method_id= COALESCE(EXCLUDED.default_payment_method_id, public.member_subscriptions.default_payment_method_id),
      latest_invoice_id        = COALESCE(EXCLUDED.latest_invoice_id, public.member_subscriptions.latest_invoice_id),
      updated_at               = NOW()
    RETURNING id
  `;

  return rows[0] ?? null;
};
