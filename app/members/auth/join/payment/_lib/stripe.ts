import { baseUrl } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { stripe } from "@/app/_lib/stripe/stripe";
import type { WebhookMeta } from "@/app/_lib/stripe/webhookMeta";
import Stripe from "stripe";
import {
  getMembershipPaymentStatus,
  markMembershipPaymentPaid,
  setUserMembershipActive,
} from "./data";
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
    success_url: `${baseUrl}${MemberRoutes.paymentSuccess()}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}${MemberRoutes.paymentCancel()}`,
    metadata: params.metadata,
    subscription_data: {
      metadata: params.metadata,
    },
  });

  return checkout;
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
