"use server";
import type { QuickEnquiry } from "@/app/lib/definitions";
import { Resend } from "resend";
import NewEnquiry from "./NewEnquiry";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "Hazara Cultural Association <no_reply@hazara.org.au>";
const toEmail = "info@hazara.org.au";

export const sendQuickEnquiryEmail = async ({ ...data }: QuickEnquiry) => {
  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data?.email,
    subject: `Website Enquiry - ${data?.fullName}`,
    react: (
      <NewEnquiry
        fullName={data.fullName}
        email={data.email}
        contactNumber={data.contactNumber}
        queryType={data.queryType}
        qMessage={data.qMessage}
      />
    ),
  });
};
