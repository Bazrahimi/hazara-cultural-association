// app/about-us/layout.tsx
import type { Metadata } from "next";
import { PublicRoutes } from "../_lib/routes";

export const metadata: Metadata = {
  title: "About Us | Hazara Cultural Association (HCA)",
  description:
    "HCA is a community-driven, volunteer-led nonprofit in Melbourne’s South-Eastern suburbs, preserving and celebrating the Hazara people’s rich culture and history.",
  alternates: { canonical: PublicRoutes.about() },
  openGraph: {
    title: "About Us | Hazara Cultural Association (HCA)",
    description:
      "HCA is a community-driven, volunteer-led nonprofit rooted in Melbourne’s South-Eastern suburbs.",
    url: PublicRoutes.about(),
    type: "website",
    siteName: "Hazara Cultural Association",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Hazara Cultural Association (HCA)",
    description:
      "Preserving and celebrating the Hazara people’s rich culture and history in Melbourne’s South-East.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No extra wrappers (header/footer are handled globally)
  return <>{children}</>;
}
