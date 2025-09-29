// app/partners/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Supporters | Hazara Cultural Association",
  description: "Organisations and supporters who stand with HCA.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
