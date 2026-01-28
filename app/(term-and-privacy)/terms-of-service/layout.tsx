// app/terms-of-service/layout.tsx
import { ORG_PROFILE } from "@/app/_lib/org/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | " + ORG_PROFILE.orgName,
  description:
    "Simple terms governing use of HCA’s website, programs, and donations.",
  alternates: { canonical: "/terms-of-service" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-50">{children}</div>;
}
