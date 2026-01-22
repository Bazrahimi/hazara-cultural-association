// app/shop/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Hazara Cultural Association",
  description:
    "Support the Hazara Cultural Association by purchasing cultural items, flags, books, and memorabilia. Proceeds fund advocacy and community programs.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
