import { ActionState } from "@/app/_lib/actionHelper";
import z from "zod";
const STATE_MAP: Record<string, string> = {
  victoria: "VIC",
  vic: "VIC",

  "new south wales": "NSW",
  nsw: "NSW",

  queensland: "QLD",
  qld: "QLD",

  "south australia": "SA",
  sa: "SA",

  "western australia": "WA",
  wa: "WA",

  tasmania: "TAS",
  tas: "TAS",

  "northern territory": "NT",
  nt: "NT",

  "australian capital territory": "ACT",
  act: "ACT",
};

export const BillingAddressSchema = z.object({
  address: z.string().trim().min(1, { message: "Address line 1 is required" }),

  address2: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v)),

  suburb: z.string().trim().min(1, { message: "Suburb is required" }),

  state: z
    .string()
    .trim()
    .min(2, { message: "State is required" })
    .transform((s) => {
      const key = s.toLowerCase();
      return STATE_MAP[key] ?? s.toUpperCase();
      // fallback: uppercase original if not found in map
    }),

  postcode: z
    .string()
    .trim()
    .regex(/^[0-9A-Za-z -]{3,10}$/, {
      message: "Enter a valid postcode (3–10 chars, digits/letters/space/-)",
    }),

  // Keep it simple: default to AU if empty, uppercase if provided
  country: z
    .string()
    .trim()
    .transform((c) => {
      if (!c) return "AU"; // still default empty -> "AU"
      return c.toLowerCase() === "australia"
        ? "AU" // special case
        : c.toUpperCase(); // otherwise just uppercase
    }),
});

export type BillingAddressInput = z.infer<typeof BillingAddressSchema>;
export type BillingAddressState = ActionState<BillingAddressInput>
