// app/terms-of-service/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hazara Cultural Association (HCA)",
  description:
    "Simple terms governing use of HCA’s website, programs, and donations.",
  alternates: { canonical: "/terms-of-service" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-50">{children}</div>;
}
