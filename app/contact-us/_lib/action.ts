"use server";
import { readFormFields, toActionErrors } from "@/app/_lib/actionHelper";
import { EnquiryState } from "./definitions";

import { sendAdminEmail, sendUserConfirmationEmail } from "./email/components";

import { ENQUIRY_FIELDS } from "../ui/ContactForm";
import { insertEnquiry } from "./data";
import { EnquirySchema } from "./schema";

export const enquiry = async (
  prevState: EnquiryState | undefined,
  formData: FormData,
): Promise<EnquiryState | undefined> => {
  const rawData = readFormFields(formData, ENQUIRY_FIELDS);

  const parsed = EnquirySchema.safeParse(rawData);

  if (!parsed.success) {
    return toActionErrors<EnquiryState["errors"]>(parsed.error);
  }

  const data = parsed.data;

  try {
    await insertEnquiry(data);
  } catch (err) {
    console.error("Failed to submit the enquiry:", err);
    return {
      ...rawData,
      ok: false,
      message: "Failed to submit the enquiry. Please try again later.",
    };
  }

  // 2) Send admin + user emails in parallel (non-critical)
  const queryLabel = formData.get("queryTypeLabel") as string;
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
  return {
    ok: true,
    message: message,
  };
};
