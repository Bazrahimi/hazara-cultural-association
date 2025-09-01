// app/shop/checkout/success/page.tsx
import { stripe } from "@/app/lib/stripe";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import type Stripe from "stripe";

export const metadata = {
  title: "Order Successful",
};

const formatCurrency = (amount?: number | null, currency?: string | null) => {
  if (typeof amount !== "number" || !currency) return "";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

type SearchParamsShape = { session_id?: string | string[] };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  // Next.js 15: searchParams is a Promise
  searchParams: Promise<SearchParamsShape>;
}) {
  const sp = await searchParams;
  const rawId = sp?.session_id;
  const sessionId = Array.isArray(rawId) ? rawId[0] : rawId;

  // Missing session id case
  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
          <Header as="h2" size="md" align="center" className="mb-4">
            Missing session
          </Header>
          <P>
            We couldn’t find your payment session. If you completed your order,
            a receipt should be emailed to you.
          </P>
          <div className="flex justify-center">
            <Link href="/shop/checkout">
              <Button>Back to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Defaults for safe rendering if retrieval fails
  let email = "";
  let name = "";
  let amountText = "";
  let currency: string | null | undefined;
  let receiptUrl: string | undefined;
  let items: Stripe.ApiList<Stripe.LineItem>["data"] = [];
  let paymentStatus: Stripe.Checkout.Session.PaymentStatus | undefined;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "line_items.data.price.product",
        "payment_intent.latest_charge",
        "customer",
      ],
    });

    currency = session.currency;
    amountText = formatCurrency(session.amount_total, session.currency);
    paymentStatus = session.payment_status;

    // identity
    email =
      session.customer_details?.email ||
      (typeof session.customer === "object"
        ? (session.customer?.email ?? "")
        : "") ||
      session.customer_email ||
      "";

    name =
      session.customer_details?.name ||
      (typeof session.customer === "object"
        ? (session.customer?.name ?? "")
        : "") ||
      "";

    // receipt
    const pi = session.payment_intent as Stripe.PaymentIntent | null;
    const latestCharge =
      typeof pi?.latest_charge === "object"
        ? (pi!.latest_charge as Stripe.Charge)
        : null;
    receiptUrl = latestCharge?.receipt_url ?? undefined;

    // items
    items = session.line_items?.data ?? [];
  } catch (err) {
    // Still render a generic success UI below
    console.error("Checkout success retrieval failed:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
        {/* Title + Test badge (hide if you like) */}
        <div className="mb-2 flex items-start justify-between gap-3">
          <Header as="h2" size="md" className="mb-0">
            Thanks for your order! 🎉
          </Header>
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            Test mode
          </span>
        </div>

        <div className="space-y-3 text-center">
          {amountText && (
            <p className="text-lg font-semibold text-slate-800">
              {amountText} paid{" "}
              {paymentStatus === "paid" ? "successfully" : "(processing)"}
            </p>
          )}

          {email ? (
            <P className="text-slate-600">
              A receipt has been sent to{" "}
              <span className="font-semibold text-slate-800">{email}</span>.
            </P>
          ) : (
            <P className="text-slate-600">Your payment was successful.</P>
          )}

          {!!name && (
            <P className="text-slate-600">
              <span className="font-semibold text-slate-800">{name}</span>
            </P>
          )}
        </div>

        {/* Items */}
        {!!items.length && (
          <div className="mt-6 rounded-lg border border-slate-200">
            <div className="border-b border-slate-200 px-4 py-3 font-semibold">
              Order Items
            </div>
            <ul className="divide-y divide-slate-200">
              {items.map((it) => {
                const p = it.price;
                const productName =
                  (p?.product as Stripe.Product | undefined)?.name ||
                  it.description ||
                  "Item";
                const unitText = formatCurrency(
                  p?.unit_amount ?? null,
                  currency
                );
                const lineText = formatCurrency(
                  // Stripe returns amount_total on line items (cents)
                  (it as any).amount_total ??
                    (p?.unit_amount ?? 0) * (it.quantity ?? 1),
                  currency
                );

                return (
                  <li
                    key={it.id}
                    className="px-4 py-3 text-sm flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="truncate">{productName}</div>
                      <div className="text-xs text-slate-500">
                        Qty {it.quantity} @ {unitText || "—"}
                      </div>
                    </div>
                    <div className="ml-4 font-medium">{lineText || "—"}</div>
                  </li>
                );
              })}
            </ul>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-slate-600">Total</span>
              <span className="text-base font-semibold">
                {amountText || "—"}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {receiptUrl && (
            <a
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline">View / Download Receipt</Button>
            </a>
          )}
          <Link href="/shop" className="inline-flex">
            <Button>Continue shopping</Button>
          </Link>
          <Link href="/shop/checkout" className="inline-flex">
            <Button variant="ghost">Go to checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
