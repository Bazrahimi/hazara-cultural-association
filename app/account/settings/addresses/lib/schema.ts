import z from "zod";

export const BillingAddressSchema = z.object({
  address: z.string().trim().min(1, { message: "Address line 1 is required" }),
  // accept empty string from form, convert to undefined
  address2: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  suburb: z.string().trim().min(1, { message: "Suburb is required" }),
  stateCode: z
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
  country: z.string().trim(),
});

export type BillingAddressInput = z.infer<typeof BillingAddressSchema>;
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type BillingAddressInputState = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors<BillingAddressInput>;
  data?: Partial<BillingAddressInput>;
};
