// app/donate/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | Hazara Cultural Association",
  description:
    "Support the Hazara Cultural Association with your donation. Contributions fund advocacy, cultural programs, and community initiatives for current and future generations.",
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
