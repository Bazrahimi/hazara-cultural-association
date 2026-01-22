"use client";

import { cn } from "@/app/lib/helper";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "./CartContext";

export default function CartIcon({ className }: { className?: string }) {
  const { totalItems } = useCart();
  if (totalItems < 1) return null;

  return (
    <nav>
      <Link
        href="/shop/cart"
        className="group flex flex-col items-center gap-1 text-white hover:text-hca-yellow-main flex-1 relative"
      >
        <CiShoppingCart className={cn("text-2xl")} />
        <span className="hidden sm:inline">Cart</span>
        <span
          className={cn(
            "absolute -top-2 -right-2 bg-red-500 text-white text-sm px-1.5 py-0.5 rounded-full",
            className
          )}
        >
          {totalItems}
        </span>
      </Link>
    </nav>
  );
}
