//app/_lib/email/client.ts

import { Resend } from "resend";

export const emailClient = new Resend(process.env.RESEND_API_KEY!);

export const FROM_EMAIL = "Hazara Cultural Association <info@hazara.org.au>";
export const WEBSITE_ENQUIRY = "Website Enquiry <website@hazara.org.au>";
export const ENQUIRY_ADMIN_EMAIL = "info@hazara.org.au";
