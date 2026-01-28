// app/contact-us/layout.tsx
import type { Metadata } from "next";
import { ORG_PROFILE } from "../_lib/org/profile";

export const metadata: Metadata = {
  title: "Contact Us | " + ORG_PROFILE.orgName,
  description: `Get in touch with the ${ORG_PROFILE.orgName} about cultural programs, community events, volunteering, donations, or advocacy.`,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
