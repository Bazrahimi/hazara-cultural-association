// app/shop/checkout/success/page.tsx
import { stripe } from "@/app/_lib/stripe";
import { Button, Header, P } from "@/app/_ui";
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

type LineItemWithTotals = Stripe.LineItem & {
  amount_total?: number | null;
  amount_subtotal?: number | null;
};

type SearchParamsShape = { session_id?: string | string[] };

/** Type guard: exclude DeletedCustomer so TS knows email/name/address exist */
function asActiveCustomer(
  c: Stripe.Customer | Stripe.DeletedCustomer | null | undefined,
): Stripe.Customer | null {
  if (!c) return null;
  return "deleted" in c && c.deleted ? null : (c as Stripe.Customer);
}

// Simple helper to render a postal-style address block
function AddressBlock({
  name,
  phone,
  address,
  emptyText = "—",
}: {
  name?: string | null;
  phone?: string | null;
  address?: Stripe.Address | null;
  emptyText?: string;
}) {
  const parts: string[] = [];
  if (address?.line1) parts.push(address.line1);
  if (address?.line2) parts.push(address.line2);
  const cityLine = [address?.city, address?.state, address?.postal_code]
    .filter(Boolean)
    .join(" ");
  if (cityLine) parts.push(cityLine);
  if (address?.country) parts.push(address.country.toUpperCase());

  const hasAnything = name || phone || parts.length > 0;

  return (
    <div className="space-y-1 text-sm text-slate-700">
      {hasAnything ? (
        <>
          {name ? <div className="font-medium">{name}</div> : null}
          {parts.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          {phone ? <div className="text-slate-500">Phone: {phone}</div> : null}
        </>
      ) : (
        <div className="text-slate-500">{emptyText}</div>
      )}
    </div>
  );
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsShape>; // Next.js 15
}) {
  const sp = await searchParams;
  const rawId = sp?.session_id;
  const sessionId = Array.isArray(rawId) ? rawId[0] : rawId;

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

  // Defaults
  let email = "";
  let name = "";
  let amountText = "";
  let currency: string | null | undefined;
  let receiptUrl: string | undefined;
  let items: Stripe.ApiList<Stripe.LineItem>["data"] = [];
  let paymentStatus: Stripe.Checkout.Session.PaymentStatus | undefined;

  // Addresses
  let billingAddress: Stripe.Address | null | undefined;
  let shippingName: string | null | undefined;
  let shippingPhone: string | null | undefined;
  let shippingAddress: Stripe.Address | null | undefined;

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

    const customerObj =
      typeof session.customer === "object"
        ? asActiveCustomer(session.customer)
        : null;

    // Identity
    email =
      session.customer_details?.email ||
      customerObj?.email ||
      session.customer_email ||
      "";

    name = session.customer_details?.name || customerObj?.name || "";

    // Billing address: prefer customer_details.address, fallback to Customer.address
    billingAddress =
      session.customer_details?.address || customerObj?.address || null;

    // Receipt
    const pi = session.payment_intent as Stripe.PaymentIntent | null;
    const latestCharge =
      typeof pi?.latest_charge === "object"
        ? (pi!.latest_charge as Stripe.Charge)
        : null;
    receiptUrl = latestCharge?.receipt_url ?? undefined;

    // Shipping: prefer PaymentIntent.shipping, then Charge.shipping
    if (pi?.shipping) {
      shippingName = pi.shipping.name;
      shippingPhone = pi.shipping.phone;
      shippingAddress = pi.shipping.address ?? undefined;
    } else if (latestCharge?.shipping) {
      shippingName = latestCharge.shipping.name;
      shippingPhone = latestCharge.shipping.phone ?? undefined;
      shippingAddress = latestCharge.shipping.address ?? undefined;
    }

    // Items
    items = session.line_items?.data ?? [];
  } catch (err) {
    console.error("Checkout success retrieval failed:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
        {/* Title + Test badge */}
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

        {/* Addresses */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-800">
              Billing Address
            </div>
            <AddressBlock name={name} address={billingAddress ?? null} />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-800">
              Shipping Address
            </div>
            <AddressBlock
              name={shippingName}
              phone={shippingPhone}
              address={shippingAddress ?? null}
            />
          </div>
        </div>

        {/* Items */}
        {items.map((it) => {
          const p = it.price;
          const productName =
            (p?.product as Stripe.Product | undefined)?.name ||
            it.description ||
            "Item";

          const unitText = formatCurrency(p?.unit_amount ?? null, currency);

          // ✅ no `any` — narrow to a type that includes the optional Stripe fields
          const li = it as LineItemWithTotals;
          const lineAmount =
            typeof li.amount_total === "number"
              ? li.amount_total
              : (p?.unit_amount ?? 0) * (it.quantity ?? 1);

          const lineText = formatCurrency(lineAmount, currency);

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
          <Link href="/shop/cart/checkout" className="inline-flex">
            <Button variant="outline">Go to checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
