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

export const updateMembershipPaymentRow = async (
  params: UpdateMembershipPaymentRow,
) => {
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

      to_timestamp(${params.billingCycleAnchor}::double precision),
      to_timestamp(${params.currentPeriodStart}::double precision),
      to_timestamp(${params.currentPeriodEnd}::double precision),

      ${params.cancelAtPeriodEnd},
      to_timestamp(${params.canceledAt}::double precision),
      to_timestamp(${params.cancelAt}::double precision),

      ${params.defaultPaymentMethodId},
      ${params.latestInvoiceId},
      NOW()
    )
    ON CONFLICT (stripe_subscription_id)
    DO UPDATE SET
      user_id                   = EXCLUDED.user_id,
      stripe_customer_id         = EXCLUDED.stripe_customer_id,
      stripe_price_id            = EXCLUDED.stripe_price_id,
      stripe_product_id          = EXCLUDED.stripe_product_id,
      status                     = EXCLUDED.status,
      collection_method          = EXCLUDED.collection_method,
      currency                   = EXCLUDED.currency,
      billing_cycle_anchor       = EXCLUDED.billing_cycle_anchor,
      current_period_start       = EXCLUDED.current_period_start,
      current_period_end         = EXCLUDED.current_period_end,
      cancel_at_period_end       = EXCLUDED.cancel_at_period_end,
      canceled_at                = EXCLUDED.canceled_at,
      cancel_at                  = EXCLUDED.cancel_at,
      default_payment_method_id  = EXCLUDED.default_payment_method_id,
      latest_invoice_id          = EXCLUDED.latest_invoice_id,
      updated_at                 = NOW()
    RETURNING id
  `;

  return rows[0] ?? null;
};
