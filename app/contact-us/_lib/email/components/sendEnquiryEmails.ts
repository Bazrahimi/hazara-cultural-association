"use server";

import { sendAdminEmail } from "./sendAdminEmail";
import { sendUserConfirmationEmail } from "./sendUserConfirmationEmail";
import type { Enquiry } from "@/app/contact-us/_lib/definitions";

export async function handleEnquiryEmails(
  data: Enquiry,
  queryLabel: string,
): Promise<{ message: string }> {
  const adminEmailPromise = sendAdminEmail({ ...data }, queryLabel);
  const userEmailPromise = sendUserConfirmationEmail({ ...data }, queryLabel);

  const [adminRes, userRes] = await Promise.allSettled([
    adminEmailPromise,
    userEmailPromise,
  ]);

  if (adminRes.status === "rejected") {
    console.error("Admin email send failed:", adminRes.reason);
  }

  if (userRes.status === "rejected") {
    console.error("User confirmation email failed:", userRes.reason);
  }

  let message = "Thanks! We have received your enquiry.";
  if (userRes.status === "rejected") {
    message += " (Heads-up: we couldn’t send the confirmation email.)";
  }

  return { message };
}
