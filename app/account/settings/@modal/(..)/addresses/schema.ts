import { z } from "zod";

// Match your DB enum values: 'shipping' | 'billing'
const AddressType = z.enum(["shipping", "billing"]);

export const AddressSchema = z.object({
  id: z.string().optional(), // present when editing
  label: z.string().trim().max(100).optional(),
  type: AddressType.default("shipping"),
  isDefault: z.coerce.boolean().optional(),

  address: z.string().trim().min(1, { message: "Address line 1 is required" }),
  address2: z.string().trim().optional(),
  suburb: z.string().trim().min(1, { message: "Suburb is required" }),
  stateCode: z
    .string()
    .trim()
    .min(2)
    .max(3, { message: "State code (e.g. VIC)" }),
  postcode: z
    .string()
    .trim()
    .min(3)
    .max(10, { message: "Postcode is required" }),
  country: z.string().trim().default("AU"),
});
