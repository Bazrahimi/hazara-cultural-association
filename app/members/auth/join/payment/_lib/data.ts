import { sql } from "@/app/_lib/db";
import { WebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import Stripe from "stripe";
import {
  CreateMembershipPaymentRow,
  UpdateMembershipPaymentRow,
  UpsertMemberSubscription,
} from "./definitions";
import { handleCheckoutCompleted, handleSubscriptionCreated } from "./stripe";

export const upsertFeeWaived = async (userId: number) => {
  await sql`
    UPDATE user_profiles
    SET
      fee_waived = true,
      updated_at = now()
    WHERE user_id = ${userId}
  `;
};

export async function createMembershipPaymentRow(
  params: CreateMembershipPaymentRow,
) {
  const rows = await sql<
    {
      id: number;
      email: string;
    }[]
  >`
    INSERT INTO membership_payments (
      user_id,
      payment_plan_key,
      amount_cents,
      status
    )
    SELECT
      u.id,
      ${params.paymentPlanKey},
      ${params.amountCents},
      'created'
    FROM users u
    WHERE u.id = ${params.userId}
    RETURNING
      id,
      (SELECT email FROM users WHERE id = ${params.userId}) AS email
  `;

  return rows[0];
}

export const updateMembershipPaymentRow = async (params: UpdateMembershipPaymentRow) => {
  const rows = await sql<{ rowId: number }[]>`
    UPDATE membership_payments
    SET
      stripe_customer_id     = COALESCE(${params.stripeCustomerId}, stripe_customer_id),
      stripe_subscription_id = COALESCE(${params.stripeSubscriptionId}, stripe_subscription_id),
      stripe_invoice_id      = COALESCE(${params.stripeInvoiceId}, stripe_invoice_id),
      status                 = COALESCE(${params.status ?? null}, status),
      updated_at             = NOW()
    WHERE id = ${params.id}
    RETURNING id AS "rowId"
  `;

  return rows[0] ?? null;
};

export async function markMembershipPaymentRedirected(params: {
  rowId: number;
  stripeCheckoutSessionId: string;
}) {
  await sql`
    UPDATE membership_payments
    SET
      stripe_checkout_session_id = ${params.stripeCheckoutSessionId},
      status = 'redirected',
      updated_at = now()
    WHERE id = ${params.rowId}
  `;
}

export const getMembershipPaymentStatus = async (rowId: number) => {
  const rows = await sql<{ status: string }[]>`
    SELECT
      status
    FROM
      membership_payments
    WHERE
      id =${rowId}
  `;
  return rows[0]?.status ?? null;
};

export const markMembershipPaymentPaid = async (params: {
  rowId: number;
  paymentIntentId: string;
  customerId: string;
  subscriptionId: string;
}) => {
  await sql`
    UPDATE
      membership_payments
    SET
      status = "paid",
      stripe_payment_intent_id = ${params.paymentIntentId},
      stripe_customer_id = ${params.customerId},
      stripe_subscription_id = ${params.subscriptionId},
      updated_at = now()
    WHERE
      id = ${params.rowId}
  `;
};

export const setUserMembershipActive = async (userId: number) => {
  await sql`
    UPDATE
      user_profiles
    SET
      membership_status = "active,
      update_at = now()
    WHERE
      user_id = ${userId}
  `;
};

export const handleInvoice = async (
  invoice: Stripe.Invoice,
  meta: WebhookMeta,
) => {
  console.log("handleInvoice_________Stripe.Invoice_________", invoice);
};

export const handleInvoiceFailed = async (
  session: Stripe.Invoice,
  meta: WebhookMeta,
) => {
  console.log("handleInvoiceFailed_________Stripe.Invoice_________", session);
};

// export const handleMemberSubscriptionSuccess = async (sub: Stripe.Event) => {
//   const subscriptionId = sub.id;

//   const customerId =
//     typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

//   if (!customerId) {
//     throw new Error(`Subscription ${subscriptionId} missing customer id`);
//   }

//   const invoiceId =
//     typeof sub.latest_invoice === "string"
//       ? sub.latest_invoice
//       : (sub.latest_invoice?.id ?? null);

//   // ✅ get rowId from subscription metadata
//   const rowIdRaw = sub.metadata?.paymentRowId;
//   if (!rowIdRaw) {
//     throw new Error(
//       `Missing metadata.paymentRowId on subscription ${subscriptionId}`,
//     );
//   }

//   const rowId = Number(rowIdRaw);
//   if (!Number.isFinite(rowId)) {
//     throw new Error(
//       `Invalid metadata.paymentRowId "${rowIdRaw}" on subscription ${subscriptionId}`,
//     );
//   }

//   // ⚠️ I recommend marking paid on invoice.paid, not subscription.created.
//   // But if you really want to mark paid here, do it:
//   await updateMembershipPaymentRow({
//     rowId,
//     customerId,
//     subscriptionId,
//     invoiceId,
//     status: "paid",
//   });

//   return { rowId, customerId, subscriptionId, invoiceId };
// };

export const handleDonationEvent = async (event: Stripe.Event) => {
  try {
    console.log(
      "handDonationEvent is Triggered_________________",
      "event_________________",
      event,
    );
  } catch (err) {
    console.error("❌ Webhook handleDonationEvent handler failed", err);
    throw err;
  }
};

export const handleMembershipEvent = async (event: Stripe.Event) => {
  // eslint-disable-next-line
  const obj: any = event.data.object as any;



  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(obj);

        break;

      case "checkout.session.completed":
        await handleCheckoutCompleted(obj as Stripe.Checkout.Session);
        break;

      // case "invoice.created":
      //   await handleMemberSubscriptionSuccess(sub);
      //   break;

      // case "invoice.finalized":
      //   await handleMemberSubscriptionSuccess(sub);
      //   break;
      default:
        console.log("ℹ️ Ignored event:", event.type);
    }
  } catch (err) {
    console.error("❌ Webhook handleMembershipEvent handler failed", err);
    throw err;
  }
};

export const upsertMemberSubscription = async (
  params: UpsertMemberSubscription,
) => {
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
      ${params.userId},
      ${params.stripeCustomerId},
      ${params.stripeSubscriptionId},
      ${params.stripePriceId},
      ${params.stripeProductId},
      ${params.status},
      ${params.collectionMethod},
      ${params.currency},

      CASE WHEN ${params.billingCycleAnchor}   IS NULL THEN NULL ELSE to_timestamp(${params.billingCycleAnchor})   END,
      CASE WHEN ${params.currentPeriodStart}   IS NULL THEN NULL ELSE to_timestamp(${params.currentPeriodStart})   END,
      CASE WHEN ${params.currentPeriodEnd}     IS NULL THEN NULL ELSE to_timestamp(${params.currentPeriodEnd})     END,

      ${params.cancelAtPeriodEnd},
      CASE WHEN ${params.canceledAt}           IS NULL THEN NULL ELSE to_timestamp(${params.canceledAt})           END,
      CASE WHEN ${params.cancelAt}             IS NULL THEN NULL ELSE to_timestamp(${params.cancelAt})             END,

      ${params.defaultPaymentMethodId},
      ${params.latestInvoiceId},
      NOW()
    )
    ON CONFLICT (stripe_subscription_id)
    DO UPDATE SET
      user_id                   = EXCLUDED.user_id,
      stripe_customer_id         = COALESCE(EXCLUDED.stripe_customer_id, public.member_subscriptions.stripe_customer_id),
      stripe_price_id            = COALESCE(EXCLUDED.stripe_price_id, public.member_subscriptions.stripe_price_id),
      stripe_product_id          = COALESCE(EXCLUDED.stripe_product_id, public.member_subscriptions.stripe_product_id),
      status                     = COALESCE(EXCLUDED.status, public.member_subscriptions.status),
      collection_method          = COALESCE(EXCLUDED.collection_method, public.member_subscriptions.collection_method),
      currency                   = COALESCE(EXCLUDED.currency, public.member_subscriptions.currency),
      billing_cycle_anchor       = COALESCE(EXCLUDED.billing_cycle_anchor, public.member_subscriptions.billing_cycle_anchor),
      current_period_start       = COALESCE(EXCLUDED.current_period_start, public.member_subscriptions.current_period_start),
      current_period_end         = COALESCE(EXCLUDED.current_period_end, public.member_subscriptions.current_period_end),
      cancel_at_period_end       = COALESCE(EXCLUDED.cancel_at_period_end, public.member_subscriptions.cancel_at_period_end),
      canceled_at                = COALESCE(EXCLUDED.canceled_at, public.member_subscriptions.canceled_at),
      cancel_at                  = COALESCE(EXCLUDED.cancel_at, public.member_subscriptions.cancel_at),
      default_payment_method_id  = COALESCE(EXCLUDED.default_payment_method_id, public.member_subscriptions.default_payment_method_id),
      latest_invoice_id          = COALESCE(EXCLUDED.latest_invoice_id, public.member_subscriptions.latest_invoice_id),
      updated_at                 = NOW()
    RETURNING id
  `;

  return rows[0] ?? null;
};


const customerSubscriptionCreated = {
  id: 'sub_1SxMe9DKM7BJVeCQw2hnPKfI',
  object: 'subscription',
  application: null,
  application_fee_percent: null,
  automatic_tax: { disabled_reason: null, enabled: false, liability: null },
  billing_cycle_anchor: 1770275195,
  billing_cycle_anchor_config: null,
  billing_mode: { flexible: null, type: 'classic' },
  billing_thresholds: null,
  cancel_at: null,
  cancel_at_period_end: false,
  canceled_at: null,
  cancellation_details: { comment: null, feedback: null, reason: null },
  collection_method: 'charge_automatically',
  created: 1770275195,
  currency: 'aud',
  customer: 'cus_TvD4Woc6zsk3Uj',
  customer_account: null,
  days_until_due: null,
  default_payment_method: 'pm_1SxMe7DKM7BJVeCQ7wfELtxA',
  default_source: null,
  default_tax_rates: [],
  description: null,
  discounts: [],
  ended_at: null,
  invoice_settings: { account_tax_ids: null, issuer: { type: 'self' } },
  items: {
    object: 'list',
    data: [ [Object] ],
    has_more: false,
    total_count: 1,
    url: '/v1/subscription_items?subscription=sub_1SxMe9DKM7BJVeCQw2hnPKfI'
  },
  latest_invoice: 'in_1SxMe7DKM7BJVeCQcDnOYrk1',
  livemode: false,
  metadata: {
    paymentKey: 'membership-annual-fee',
    userId: '10',
    paymentType: 'membership',
    paymentRowId: '28'
  },
  next_pending_invoice_item_invoice: null,
  on_behalf_of: null,
  pause_collection: null,
  payment_settings: {
    payment_method_options: {
      acss_debit: null,
      bancontact: null,
      card: [Object],
      customer_balance: null,
      konbini: null,
      payto: null,
      sepa_debit: null,
      us_bank_account: null
    },
    payment_method_types: null,
    save_default_payment_method: 'off'
  },
  pending_invoice_item_interval: null,
  pending_setup_intent: null,
  pending_update: null,
  plan: {
    id: 'price_1SvbxjDKM7BJVeCQA6yDaG1M',
    object: 'plan',
    active: true,
    amount: 11500,
    amount_decimal: '11500',
    billing_scheme: 'per_unit',
    created: 1769857415,
    currency: 'aud',
    interval: 'year',
    interval_count: 1,
    livemode: false,
    metadata: {},
    meter: null,
    nickname: null,
    product: 'prod_TtOl8sLrimTqvO',
    tiers_mode: null,
    transform_usage: null,
    trial_period_days: null,
    usage_type: 'licensed'
  },
  quantity: 1,
  schedule: null,
  start_date: 1770275195,
  status: 'active',
  test_clock: null,
  transfer_data: null,
  trial_end: null,
  trial_settings: { end_behavior: { missing_payment_method: 'create_invoice' } },
  trial_start: null
}