"use server";
import { toActionErrors } from "@/app/_lib/actionHelper";
import { EnquiryState } from "./definitions";

import { insertEnquiry } from "./data";
import { handleEnquiryEmails } from "./email/components/sendEnquiryEmails";
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
  };

  const parsed = EnquirySchema.safeParse(rawData);

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
  const queryLabel = formData.get("queryTypeLabel") as string;
  const { message } = await handleEnquiryEmails(data, queryLabel);
  return {
    ok: true,
    message: message,
  };
};
