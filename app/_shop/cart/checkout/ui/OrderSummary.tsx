"use client";
import { useCart } from "@/app/_shop/ui/cart/CartContext";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import Row from "./order-summary/Row";
import SummaryRow from "./order-summary/SummaryRow";

const OrderSummary = () => {
  const { items, subtotal, postageTotal } = useCart();

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



  return (
    <div aria-labelledby="order-summary" className="space-y-3">
      <Header as="h2" size="xs" id="order-summary">
        Order Summary
      </Header>
      <section
        aria-labelledby="totals"
        className="rounded-md border border-gray-200 p-4"
      >
        <Header as="h3" size="xs">
          Totals
        </Header>
        <div className="flex flex-col items-end gap-2">
          <Row label="Sub-total" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Postage:" value={`$${postageTotal.toFixed(2)}`} />
          <Row label="Total:" value={`$${subtotal + postageTotal}`} bold />
        </div>
      </section>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3 font-semibold">Product</th>
              <th className="p-3 text-center font-semibold w-[120px]">Qty</th>
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
    </div>
  );
};

export default OrderSummary;
