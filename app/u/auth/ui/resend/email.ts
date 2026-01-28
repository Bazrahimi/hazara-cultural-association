//app/u/auth/ui/resend/email.ts

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export const FROM_EMAIL = "Hazara Cultural Association <info@hazara.org.au>";
