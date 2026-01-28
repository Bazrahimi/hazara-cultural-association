//app/_lib/email/client.ts

import { Resend } from "resend";
import { ORG_PROFILE } from "../org/profile";

export const emailClient = new Resend(process.env.RESEND_API_KEY!);

export const FROM_EMAIL = `${ORG_PROFILE.orgName} <${ORG_PROFILE.email}>`;
export const WEBSITE_ENQUIRY = `Website Enquiry <website${ORG_PROFILE.domain}>`;
export const ENQUIRY_ADMIN_EMAIL = ORG_PROFILE.email;
