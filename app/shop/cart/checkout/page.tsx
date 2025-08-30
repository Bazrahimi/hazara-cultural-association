"use client";

import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartItem } from "../../lib/definitions";
import { useCart } from "../../ui/cart/CartContext";
import GuestCheckout from "./ui/GuestCheckout";
import ShippingAddress from "./ui/ShippingAddress";
import SocialAccount from "./ui/SocialAccount";

const GST_RATE = 0;

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  // NEW: hold saved email (hydrated from localStorage)
  const [checkoutEmail, setCheckoutEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem("checkoutEmail");
      if (v) setCheckoutEmail(v);
    } catch {}
  }, []);

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

  const onEditEmail = () => {
    try {
      localStorage.removeItem("checkoutEmail");
    } catch {}
    setCheckoutEmail(null);
    setActiveMethod("guest"); // jump to the email form again
  };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <div>
        <Header as="h1">Checkout</Header>

        <P className="mt-1">
          Review your order and choose how you’d like to continue.
        </P>
      </div>

      <Header as="h2" size="sm">
        Email
      </Header>
      {/* If email exists, show “Email” summary like your screenshot */}
      {checkoutEmail && (
        <section className="rounded-md border border-gray-200 px-4 py-5">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditEmail}
              aria-label="Edit email"
            >
              Edit
            </Button>
          </div>
          <P className="mt-2 text-gray-600">
            You are ordering as:{" "}
            <span className="font-semibold">{checkoutEmail}</span>
          </P>
        </section>
      )}

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        {/* RIGHT: Methods panel — hide it if we already have an email */}

        <aside className="space-y-6">
          {!checkoutEmail && (
            <section
              aria-labelledby="how-to-continue"
              className="rounded-md border border-gray-200 p-4"
            >
              <Header
                as="h3"
                size="xs"
                id="how-to-continue"
                className="text-gray-600"
              >
                Your preferred methods to checkout
              </Header>

              <div className="space-y-3">
                {(!activeMethod || activeMethod === "guest") && (
                  <GuestCheckout
                    setActiveMethod={setActiveMethod}
                    // NEW: update page state when email is saved
                    onEmailSaved={(email) => setCheckoutEmail(email)}
                  />
                )}

                {/* These are already hidden when activeMethod === "guest" */}
                {!activeMethod && (
                  <>
                    <SocialAccount />
                    <Button variant="outline" fullWidth>
                      Continue with Email
                    </Button>
                  </>
                )}
              </div>
            </section>
          )}
          <Header as="h2" size="sm">
            Shipping Address
          </Header>
          {checkoutEmail && (
            <>
              <ShippingAddress />
            </>
          )}
        </aside>

        {/* LEFT: Order Summary */}
        <section aria-labelledby="order-summary">
          <Header as="h2" size="xs" id="order-summary">
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
