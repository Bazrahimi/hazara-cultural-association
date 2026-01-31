import z from "zod";
import { PAYMENT_FIELDS as f } from "./constant";

export const PaymentSchema = z.object({
  [f.plan]: z.enum(["monthly", "annual"], {
    message: "Please choose a membership option.",
  }),
  [f.feeWaived]: z.boolean().optional(),
  [f.waiverReason]: z.string().trim().max(500).optional(),
});
