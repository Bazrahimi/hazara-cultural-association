"use client";

import { Header } from "@/app/ui/global/Header";
import Link from "next/link";

import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import type { CartItem } from "../../lib/definitions";
import { useCart } from "../../ui/cart/CartContext";
import GuestCheckout from "./ui/GuestCheckout";
import SocialAccount from "./ui/SocialAccount";

const GST_RATE = 0; // set to 0.10 if you start charging GST

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <P>Your cart is empty.</P>
        <Link href="/shop" className="underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <P className="mt-1">
          Review your order and choose how you’d like to continue.
        </P>
      </div>

      {/* Content layout */}
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        {/* Right: Method + Totals */}
        <aside className="space-y-6">
          {/* Choose method */}
          <section
            aria-labelledby="how-to-continue"
            className="rounded-md border border-gray-200 p-4"
          >
            <Header as="h2" size="xs" id="how-to-continue">
              Your preferred methods to checkout
            </Header>

            <div className="space-y-3">
              <GuestCheckout />
              <SocialAccount />
              <Button variant="outline" fullWidth>
                Continue with Email
              </Button>
            </div>
          </section>

          {/* Totals */}
        </aside>

        {/* Left: Order Summary */}
        <section aria-labelledby="order-summary">
          <h2 id="order-summary" className="mb-3 text-lg font-semibold"></h2>
          <Header as="h2" size="xs">
            {" "}
            Order Summary
          </Header>

          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="p-3 font-semibold">Product</th>
                  <th className="p-3 text-center font-semibold w-[120px]">
                    Qty
                  </th>
                  <th className="p-3 text-right font-semibold w-[120px]">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <SummaryRow key={it.id} item={it} />
                ))}
              </tbody>
            </table>
          </div>
          {/* Total */}

          <section
            aria-labelledby="totals"
            className="rounded-md border border-gray-200 p-4"
          >
            <Header as="h3" size="xs">
              Totals
            </Header>
            <div className="flex flex-col items-end gap-2">
              <Row label="Sub-total" value={`$${subtotal.toFixed(2)}`} />
              <Row label="GST:" value={`$${gst.toFixed(2)}`} />
              <Row label="Total:" value={`$${total.toFixed(2)}`} bold />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

/* --- Small helpers --- */
function SummaryRow({ item }: { item: CartItem }) {
  const line = item.qty * item.price;
  return (
    <tr className="border-t">
      <td className="p-3">{item.name}</td>
      <td className="p-1 text-center tabular-nums">{item.qty}</td>
      <td className="p-1 text-right tabular-nums">${line.toFixed(2)}</td>
    </tr>
  );
}

function Row({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex w-full max-w-xs items-center justify-between">
      <P className={bold ? "font-bold" : ""}>{label}</P>
      <P className={bold ? "font-bold tabular-nums" : "tabular-nums"}>
        {value}
      </P>
    </div>
  );
}
