"use server";
import { ENQUIRY_ADMIN_EMAIL, emailClient } from "@/app/_lib/email/client";
import type { QuickEnquiry } from "@/app/contact-us/_lib/definitions";
import NewEnquiryAdmin from "../templates/NewEnquiry";

export async function sendAdminEmail(data: QuickEnquiry, queryLabel: string) {
  try {
    const result = await emailClient.emails.send({
      from: "Website Enquiry <website@hazara.org.au>", // must be verified in Resend
      to: [ENQUIRY_ADMIN_EMAIL],
      replyTo: data.email || undefined,
      subject: `New Quick Enquiry – ${data.fullName}`,
      react: <NewEnquiryAdmin {...data} queryLabel={queryLabel} />,
    });

    return result;
  } catch (error) {
    console.error("❌ Failed to send admin email:", error);
    throw error;
  }
}
