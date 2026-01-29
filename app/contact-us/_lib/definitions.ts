import z from "zod";
import { EnquirySchema } from "./schema";


/**2) data shape directly from schema  */
export type Enquiry = z.infer<typeof EnquirySchema>;

/**3) Generic Helpers for action state typed by any schema-derived data */
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export type ActionState<T> = {
  /** Optionally return back the user’s data so the form can re-fill */
  data?: Partial<T>;
  /** Per-field error arrays, keyed by T’s fields */
  errors?: FieldErrors<T>;
  /** UI convenience flags/text */
  message?: string;
  ok?: boolean;
};

export type EnquiryState = ActionState<Enquiry>;


