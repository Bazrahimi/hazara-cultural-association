// app/privacy-policy/layout.tsx
import { PublicRoutes } from "@/app/_lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hazara Cultural Association (HCA)",
  description:
    "How HCA handles personal data, Neon Postgres storage, password hashing, and breach response.",
  alternates: { canonical: PublicRoutes.privacyPolicy() },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-50">{children}</div>;
}
