// app/contact-us/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Hazara Cultural Association",
  description:
    "Get in touch with the Hazara Cultural Association about cultural programs, community events, volunteering, donations, or advocacy.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{ children }</>;
}
