import { sql } from "@/app/_lib/db";
import { stripe } from "@/app/_lib/stripe";
import Stripe from "stripe";
import { PaymentPlans } from "./definitions";

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
  plan: PaymentPlans;
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
      plan,
      amount_cents,
      status
    )
    SELECT
      u.id,
      ${params.plan},
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

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session,
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

export const handleInvoice = async (invoice: Stripe.Invoice) => {
  console.log("handleInvoice_________Stripe.Invoice_________", invoice);
};

export const handleInvoiceFailed = async (session: Stripe.Invoice) => {
  console.log("handleInvoiceFailed_________Stripe.Invoice_________", session);
};



export const handleInvoicePaymentPaid = async (ip: Stripe.InvoicePayment) => {
  if (ip.status !== "paid") return;

  const invoiceId = typeof ip.invoice === "string" ? ip.invoice : ip.invoice?.id;
  if (!invoiceId) {
    console.warn("invoice_payment.paid missing invoice id", ip.id);
    return;
  }

  const invoice = await stripe.invoices.retrieve(invoiceId, {
    expand: ["lines.data.price.product"],
  });

  // ✅ subscription id from your current invoice shape
  const subscriptionId =
    invoice?.parent?.subscription_details?.subscription 

  const metadata =
    invoice?.parent?.subscription_details?.metadata ?? null;

  // We can read paymentRowId/userId straight from invoice parent metadata (fast)
  const paymentRowId = Number(metadata?.paymentRowId);
  const userId = Number(metadata?.userId);

  if (!subscriptionId || !paymentRowId || !userId) {
    console.warn("Missing subscriptionId/paymentRowId/userId", {
      invoiceId: invoice?.id,
      subscriptionId,
      metadata,
    });
    return;
  }

  // ✅ Idempotency: ignore retries if already paid
  const rows = await sql<{ status: string }[]>`
    SELECT status FROM membership_payments WHERE id = ${paymentRowId}
  `;
  if (rows[0]?.status === "paid") {
    console.log("Already processed (paid) row", paymentRowId);
    return;
  }

  // Update membership_payments with Stripe IDs you actually store
  await sql`
    UPDATE membership_payments
    SET
      status = 'paid',
      stripe_payment_intent_id = ${String(ip?.payment?.payment_intent ?? "")},
      stripe_customer_id = ${String(invoice?.customer ?? "")},
      stripe_subscription_id = ${String(subscriptionId)},
      updated_at = now()
    WHERE id = ${paymentRowId}
  `;

  // Activate user membership in your app
  await sql`
    UPDATE user_profiles
    SET membership_status = 'active', updated_at = now()
    WHERE user_id = ${userId}
  `;

  console.log("✅ Paid + activated", {
    paymentRowId,
    userId,
    subscriptionId,
    paymentIntent: ip?.payment?.payment_intent,
  });
};
