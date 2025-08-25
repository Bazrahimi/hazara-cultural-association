import z from "zod";
import { AuthSchema, QuickEnquirySchema } from "./schema";

export type SessionPayload = {
  userId: string; // required
  isAdmin?: boolean; // optional
  expiresAt: Date; // required
  [key: string]: unknown; // index signature
};

export type Session = {
  userId: string;
  isAdmin: boolean;
  expiresAt: string;
  iat: number;
  exp: number;
};

/**2) data shape directly from schema  */
export type QuickEnquiry = z.infer<typeof QuickEnquirySchema>;

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

export type QuickEnquiryState = ActionState<QuickEnquiry>;

type Auth = z.infer<typeof AuthSchema>;
export type AuthState = ActionState<Auth>;
