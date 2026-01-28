import { Resend } from "resend";

export const emailClient = new Resend(process.env.RESEND_API_KEY!);

export const FROM_EMAIL = "Hazara Cultural Association <info@hazara.org.au>";
