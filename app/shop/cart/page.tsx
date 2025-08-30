"use client";

import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import type { CartItem } from "../lib/definitions";
import { useCart } from "../ui/cart/CartContext";

export default function CartPage() {
  const { items, subtotal, updateQty, remove } = useCart();

  if (!items.length) {
    return (
      <div>
        <P className="p-6">Your cart is empty.</P>
        <Button as="link" href="/shop">
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <CartTable items={items} updateQty={updateQty} remove={remove} />

      {/* Totals */}
      <div className="mt-6 flex flex-col items-end gap-2">
        <div className="flex w-full max-w-xs items-center justify-between">
          <P className="font-bold">Sub-Total:</P>
          <P className="tabular-nums">${subtotal.toFixed(2)}</P>
        </div>
        <div className="flex w-full max-w-xs items-center justify-between">
          <P className="font-bold">GST:</P>
          <P className="tabular-nums">0</P>
        </div>
        <div className="flex w-full max-w-xs items-center justify-between">
          <P className="font-bold">Total:</P>
          <P className="tabular-nums">${(subtotal + 0).toFixed(2)}</P>
        </div>
      </div>

      <form action="/shop/cart/checkout" className="mt-10 text-end">
        <Button type="submit">Checkout</Button>
      </form>
    </div>
  );
}

/* ---------------------------------
 * Table with headers
 * --------------------------------*/
function CartTable({
  items,
  updateQty,
  remove,
}: {
  items: CartItem[];
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th scope="col" className="p-3 font-semibold">
              Product
            </th>
            <th scope="col" className="p-3 text-center font-semibold w-[140px]">
              Qty
            </th>
            <th scope="col" className="p-3 text-right font-semibold w-[110px]">
              Total
            </th>
            <th scope="col" className="p-3 text-right font-semibold w-[90px]">
              Remove
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <CartRow
              key={item.id}
              item={item}
              updateQty={updateQty}
              remove={remove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------
 * Row
 * --------------------------------*/
function CartRow({
  item,
  updateQty,
  remove,
}: {
  item: CartItem;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  const lineTotal = item.qty * item.price;

  return (
    <tr className="border-t">
      {/* Product (thumb + name + unit price) */}
      <td className="p-3 align-middle">
        <div className="flex items-center gap-3 min-w-0">
          {/* Square thumbnail with stable layout */}
          <div className="relative h-12 w-12 overflow-hidden rounded">
            <Image
              src={item.img}
              alt={item.name}
              fill
              className="object-cover"
              sizes="48px"
              loading="lazy"
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold truncate">{item.name}</p>
            <p className="text-gray-500">${item.price.toFixed(2)} each</p>
          </div>
        </div>
      </td>

      {/* Qty controls */}
      <td className="p-3 align-middle">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="text-2xl leading-none"
            onClick={() => updateQty(item.id, item.qty - 1)}
          >
            <CiCircleMinus />
          </button>

          <P className="w-8 text-center tabular-nums">{item.qty}</P>

          <button
            type="button"
            aria-label="Increase quantity"
            className="text-2xl leading-none"
            onClick={() => updateQty(item.id, item.qty + 1)}
          >
            <CiCirclePlus />
          </button>
        </div>
      </td>

      {/* Line total */}
      <td className="p-3 align-middle text-right tabular-nums">
        ${lineTotal.toFixed(2)}
      </td>

      {/* Remove */}
      <td className="p-3 align-middle text-right">
        <Button
          size="xs"
          variant="danger"
          onClick={() => remove(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          x
        </Button>
      </td>
    </tr>
  );
}
