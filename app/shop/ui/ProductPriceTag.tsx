// app/ui/shop/ProductPriceTag.tsx
import React from "react";
import clsx from "clsx";

type Props = {
  priceCents: number;   
  postageCents: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const PAD: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
};

const formatAUD = (cents: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    currencyDisplay: "code", // "AUD 650.00"
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);

export default function ProductPriceTag({
  priceCents,
  postageCents,
  className,
  size = "md",
}: Props) {
  return (
    <div
      className={clsx(
        "w-full rounded-md bg-hca-yellow-dark text-white font-bold text-center shadow-sm",
        PAD[size],
        className
      )}
      role="status"
      aria-label="Total price"
    >
      {formatAUD((priceCents+postageCents))}
    </div>
  );
}
