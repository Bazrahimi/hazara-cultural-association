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

export type SendQuickEnquiry = {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  queryType?: string;
  qMessage?: string;
  errors?: {
    fullName?: string[];
    email?: string[];
    contactNumber?: string[];
    queryType?: string[];
    qMessage?: string[];
  };
  message?: string;
  ok?: boolean;
};

export type QuickEnquiry = z.infer<typeof QuickEnquirySchema>;
