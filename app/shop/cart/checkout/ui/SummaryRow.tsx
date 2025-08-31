"use client";
import { CartItem } from "@/app/shop/lib/definitions";
const SummaryRow = ({ item }: { item: CartItem }) => {
  const line = item.qty * item.price;
  return (
    <tr className="border-t">
      <td className="p-3">{item.name}</td>
      <td className="p-1 text-center tabular-nums">{item.qty}</td>
      <td className="p-1 text-right tabular-nums">${line.toFixed(2)}</td>
    </tr>
  );
};

export default SummaryRow;
