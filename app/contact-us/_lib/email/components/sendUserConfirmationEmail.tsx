"use server";

import {
  ENQUIRY_ADMIN_EMAIL,
  FROM_EMAIL,
  emailClient,
} from "@/app/_lib/email/client";
import type { QuickEnquiry } from "@/app/contact-us/_lib/definitions";
import EnquiryConfirmation from "../templates/NewEnquiry";

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
