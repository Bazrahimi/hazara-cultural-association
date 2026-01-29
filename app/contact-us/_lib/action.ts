"use server";
import { toActionErrors } from "@/app/_lib/actionHelper";
import { EnquiryState } from "./definitions";

import { sendAdminEmail, sendUserConfirmationEmail } from "./email/components";

import { insertEnquiry } from "./data";
import { EnquirySchema } from "./schema";

export const enquiry = async (
  prevState: EnquiryState | undefined,
  formData: FormData,
): Promise<EnquiryState | undefined> => {
  const rawData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,
    queryType: formData.get("queryType"),
    qMessage: formData.get("qMessage") as string,
    queryLabel: formData.get("queryTypeLabel") as string,
  };

  const parsed = EnquirySchema.safeParse({
    fullName: rawData.fullName,
    email: rawData.email,
    contactNumber: rawData.contactNumber,
    queryType: rawData.queryType,
    qMessage: rawData.qMessage,
  });

  console.log(parsed);

  if (!parsed.success) {
    return {
      ...toActionErrors<EnquiryState["errors"]>(parsed.error),
      data: {
        fullName: rawData.fullName,
        email: rawData.email,
        contactNumber: rawData.contactNumber,
        queryType: Number(rawData.queryType),
        qMessage: rawData.qMessage,
      },
    };
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
