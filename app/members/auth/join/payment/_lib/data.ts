import { sql } from "@/app/_lib/db";
import {} from "@/app/_lib/stripe/stripe";
import { WebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import { stripe } from "@/app/_lib/stripe/stripe";
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

export const handleInvoicePaymentPaid = async (
  ip: Stripe.InvoicePayment,
  meta: WebhookMeta,
) => {
  if (ip.status !== "paid") return;

  const invoiceId =
    typeof ip.invoice === "string" ? ip.invoice : ip.invoice?.id;
  if (!invoiceId) {
    console.warn("invoice_payment.paid missing invoice id", ip.id);
    return;
  }

  const invoice = (await stripe.invoices.retrieve(invoiceId, {
    expand: ["lines.data.price.product"],
    // eslint-disable-next-line
  })) as any;

  console.log("Invoice_______________________", invoice);

  // ✅ subscription id from your current invoice shape
  const subscriptionId =
    invoice?.parent?.subscription_details?.subscription ??
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    (typeof (invoice as any).subscription === "string"
      ? (invoice as any).subscription
      : (invoice as any).subscription?.id);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const metadata: WebhookMeta = invoice?.parent?.subscription_details?.metadata;

  if (!metadata) {
    console.warn("Missing Payment metaData", metadata);
    return;
  }

  const status = await getMembershipPaymentStatus(
    Number(metadata.paymentRowId),
  );
  if (status === "paid") {
    console.log("Already processed (paid) row", metadata);
    return;
  }

  await markMembershipPaymentPaid({
    rowId: Number(metadata.paymentRowId),
    paymentIntentId: String(ip.payment.payment_intent),
    customerId: String(invoice.customer),
    subscriptionId: subscriptionId,
  });

  await setUserMembershipActive(Number(metadata.userId));
  console.log("✅ Paid + activated", metadata);
};

export const handleMembershipEvent = async (
  event: Stripe.Event,
  meta: WebhookMeta,
) => {
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object, meta);

        break;
      case "invoice.paid":
        await handleInvoice(event.data.object, meta);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object, meta);
        break;

      // Payment-based invoice events (what you are receiving)
      case "invoice_payment.paid":
        await handleInvoicePaymentPaid(
          event.data.object as Stripe.InvoicePayment,
          meta,
        );
        break;
      default:
        console.log("ℹ️ Ignored event:", event.type);
    }
  } catch (err) {
    console.error("❌ Webhook handler failed", err);
    return new Response("Webhook failed", { status: 500 });
  }
};
