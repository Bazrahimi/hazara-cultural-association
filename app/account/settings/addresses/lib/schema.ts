import z from "zod";

export const BillingAddressSchema = z.object({
  address: z.string().trim().min(1, { message: "Address line 1 is required" }),

  address2: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .optional(),

  suburb: z.string().trim().min(1, { message: "Suburb is required" }),

  state: z
    .string()
    .trim()
    .min(2, { message: "State-code is required" })
    .transform((s) => s.toUpperCase()),

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
    .transform((c) => (c ? c.toUpperCase() : "AU")),
});

export type BillingAddressInput = z.infer<typeof BillingAddressSchema>;
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type BillingAddressInputState = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors<BillingAddressInput>;
  data?: Partial<BillingAddressInput>;
};
