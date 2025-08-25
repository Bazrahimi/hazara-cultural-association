import z from "zod";
import { QuickEnquirySchema } from "./schema";

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

export type LoginState =
  | {
      email?: string;
      password?: string;
      message?: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  // "|" in TypeScript is the union operator
  | undefined;

// export type SendQuickEnquiry = {
//   fullName?: string;
//   email?: string;
//   contactNumber?: string;
//   queryType?: string;
//   qMessage?: string;
//   errors?: {
//     fullName?: string[];
//     email?: string[];
//     contactNumber?: string[];
//     queryType?: string[];
//     qMessage?: string[];
//   };
//   message?: string;
//   ok?: boolean;
// };

/**2) data shape directly from schema  */
export type QuickEnquiry = z.infer<typeof QuickEnquirySchema>;

/**3) Generic Helpers for action state typed by any schema-derived data */
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>

export type ActionState<T> = {
  /** Optionally return back the user’s data so the form can re-fill */
  data?: Partial<T>;
  /** Per-field error arrays, keyed by T’s fields */
  errors?: FieldErrors<T>;
  /** UI convenience flags/text */
  message?: string;
  ok?: boolean;
};

export type SendQuickEnquiry = ActionState<QuickEnquiry>



