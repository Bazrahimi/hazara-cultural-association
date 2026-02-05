import { sql } from "@/app/_lib/db";
import { WebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import Stripe from "stripe";
import { PaymentKey } from "./definitions";

export const upsertFeeWaived = async (userId: number) => {
  await sql`
    UPDATE user_profiles
    SET
      fee_waived = true,
      updated_at = now()
    WHERE user_id = ${userId}
  `;
};

export async function createMembershipPaymentRow(params: {
  userId: number;
  paymentKey: PaymentKey;
  amountCents: number;
}) {
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
      ${params.paymentKey},
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

export const updateMembershipPaymentRow = async (params: {
  rowId: number;
  customerId: string;
  subscriptionId: string;
  invoiceId: string | null;
  status?:
    | "paid"
    | "failed"
    | "canceled"
    | "refunded"
    | "created"
    | "redirected";
}) => {
  const rows = await sql<{ rowId: number }[]>`
    UPDATE membership_payments
    SET
      stripe_customer_id     = COALESCE(${params.customerId}, stripe_customer_id),
      stripe_subscription_id = COALESCE(${params.subscriptionId}, stripe_subscription_id),
      stripe_invoice_id      = COALESCE(${params.invoiceId}, stripe_invoice_id),
      status                 = COALESCE(${params.status ?? null}, status),
      updated_at             = NOW()
    WHERE id = ${params.rowId}
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

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session,
  meta: WebhookMeta,
) => {
  console.log(
    "handleCheckoutCompleted_________Stripe.Checkout.Session_________",
    session,
  );
  const userId = Number(session.metadata?.userId);
  const paymentRowId = Number(session.metadata?.paymentRowId);

  if (!userId || !paymentRowId) {
    console.warn("⚠️ Missing metadata on checkout session", session.id);
    return;
  }
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

export const handleMemberSubscriptionSuccess = async (
  sub: Stripe.Subscription,
) => {
  const subscriptionId = sub.id;

  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

  if (!customerId) {
    throw new Error(`Subscription ${subscriptionId} missing customer id`);
  }

  const invoiceId =
    typeof sub.latest_invoice === "string"
      ? sub.latest_invoice
      : (sub.latest_invoice?.id ?? null);

  // ✅ get rowId from subscription metadata
  const rowIdRaw = sub.metadata?.paymentRowId;
  if (!rowIdRaw) {
    throw new Error(
      `Missing metadata.paymentRowId on subscription ${subscriptionId}`,
    );
  }

  const rowId = Number(rowIdRaw);
  if (!Number.isFinite(rowId)) {
    throw new Error(
      `Invalid metadata.paymentRowId "${rowIdRaw}" on subscription ${subscriptionId}`,
    );
  }

  // ⚠️ I recommend marking paid on invoice.paid, not subscription.created.
  // But if you really want to mark paid here, do it:
  await updateMembershipPaymentRow({
    rowId,
    customerId,
    subscriptionId,
    invoiceId,
    status: "paid",
  });

  return { rowId, customerId, subscriptionId, invoiceId };
};

export const handleDonationEvent = async (sub: Stripe.Subscription) => {
  try {
    console.log(
      "handDonationEvent is Triggered_________________",
      "sub_________________",
      sub,
    );
  } catch (err) {
    console.error("❌ Webhook handleDonationEvent handler failed", err);
    throw err;
  }
};

export const handleMembershipEvent = async (
  sub: Stripe.Subscription,
  eventType: Stripe.Event.Type,
) => {
  console.log(
    "handMembershipEvent is Triggered_________________Sub",

    sub,
  );
  try {
    switch (eventType) {
      case "customer.subscription.created":
        await handleMemberSubscriptionSuccess(sub);

        break;
      case "checkout.session.completed":
        await handleMemberSubscriptionSuccess(sub);
        break;
      case "invoice.created":
        await handleMemberSubscriptionSuccess(sub);
        break;

      case "invoice.finalized":
        await handleMemberSubscriptionSuccess(sub);
        break;
      default:
        console.log("ℹ️ Ignored event:", eventType);
    }
  } catch (err) {
    console.error("❌ Webhook handleMembershipEvent handler failed", err);
    throw err;
  }
};
