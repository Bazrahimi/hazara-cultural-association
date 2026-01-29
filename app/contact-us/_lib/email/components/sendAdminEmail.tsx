"use server";
//app/contact-us/_lib/email/component/sendAdminEmail.tsx
import {
  ENQUIRY_ADMIN_EMAIL,
  WEBSITE_ENQUIRY,
  emailClient,
} from "@/app/_lib/email/client";
import type { Enquiry } from "@/app/contact-us/_lib/definitions";
import NewEnquiry from "../templates/newEnquiry";

export async function sendAdminEmail(data: Enquiry, queryLabel: string) {
  try {
    const result = await emailClient.emails.send({
      from: WEBSITE_ENQUIRY,
      to: [ENQUIRY_ADMIN_EMAIL],
      replyTo: data.email || undefined,
      subject: `New Quick Enquiry – ${data.fullName}`,
      react: <NewEnquiry {...data} queryLabel={queryLabel} />,
    });

    return result;
  } catch (error) {
    console.error("❌ Failed to send admin email:", error);
    throw error;
  }
}
