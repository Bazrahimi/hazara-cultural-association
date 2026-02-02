import type { ActionState } from "@/app/_lib/actionHelper";
import z from "zod";
import { EnquiryFormSchema, EnquirySchema } from "./schema";

/**2) data shape directly from schema  */
export type Enquiry = z.infer<typeof EnquirySchema>;
export type EnquiryForm = z.infer<typeof EnquiryFormSchema>;

export type EnquiryState = ActionState<EnquiryForm>;
