// app/donate/layout.tsx
import type { Metadata } from "next";
import { ORG_PROFILE } from "../_lib/org/profile";

export const metadata: Metadata = {
  title: "Donate | " + ORG_PROFILE.orgName,
  description: `Support the ${ORG_PROFILE.orgName} with your donation. Contributions fund advocacy, cultural programs, and community initiatives for current and future generations.`,
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
