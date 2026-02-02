import { ActionState } from "@/app/_lib/actionHelper";
import { AUS_STATES } from "@/app/_lib/helper";
import { z } from "zod";

/** Buyer/contact details used for PURCHASE checkout (no amount here) */
export const BuyerSchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  contactNumber: z.string().min(6).optional(), // tighten if you like
  address1: z.string().min(5, { message: "Please enter your street address" }),
  address2: z.string().optional(),
  suburb: z.string().min(2, { message: "Please enter your suburb/city" }),
  stateCode: z.enum(AUS_STATES, { message: "Select your State" }),
  // keep as string so leading zeros are preserved
  postCode: z.string().regex(/^\d{4}$/, "Postcode must be 4 digits"),
});
export type Buyer = z.infer<typeof BuyerSchema>;

/** Cart item(s) for PURCHASE checkout */
export const CartItemSchema = z.object({
  id: z.number(), // your SKU / product id
  name: z.string().min(1),
  // coerce in case values arrive as strings from form/localStorage
  price: z.coerce.number().nonnegative(), // AUD dollars
  qty: z.coerce.number().int().positive(),
  image: z.string().url().optional(),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const CartSchema = z
  .array(CartItemSchema)
  .min(1, { message: "Cart is empty" });
export type Cart = z.infer<typeof CartSchema>;

/** Purchase-oriented states */
export type BuyerState = ActionState<Buyer>;
export type CartState = ActionState<Cart>;
