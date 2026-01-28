// app/partners/layout.tsx
import type { Metadata } from "next";
import { ORG_PROFILE } from "../_lib/org/profile";

export const metadata: Metadata = {
  title: "Partners & Supporters | " + ORG_PROFILE.orgName,
  description: "Organisations and supporters who stand with HCA.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
