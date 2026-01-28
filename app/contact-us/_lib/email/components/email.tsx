"use server";
import type { QuickEnquiry } from "@/app/contact-us/_lib/definitions";
import {
  ENQUIRY_ADMIN_EMAIL,
  FROM_EMAIL,
  emailClient,
} from "@/app/ui/global/email/client";
import EnquiryConfirmation from "../templates/NewEnquiry";

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

export async function sendUserConfirmationEmail(
  data: QuickEnquiry,
  queryLabel: string,
) {
  return emailClient.emails.send({
    from: FROM_EMAIL,
    to: [data.email], // user receives copy/confirmation
    replyTo: ENQUIRY_ADMIN_EMAIL, // replies from user go to your inbox
    subject: `We’ve received your enquiry – ${data.fullName}`,
    react: (
      <EnquiryConfirmation
        fullName={data.fullName}
        email={data.email}
        contactNumber={data.contactNumber}
        queryType={data.queryType}
        qMessage={data.qMessage}
        queryLabel={queryLabel}
      />
    ),
  });
}
