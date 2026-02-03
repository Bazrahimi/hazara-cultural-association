import { ActionState, BooleanKeys } from "@/app/_lib/actionHelper";
import z from "zod";
import { PAYMENT_FIELDS as payment, PAYMENT_KEY } from "./constant";
export const PaymentSchema = z.object({
  [payment.paymentKey]: z.enum(PAYMENT_KEY, {
    message: "Please choose a membership option.",
  }),
  [payment.feeWaived]: z.boolean().optional(),
  [payment.waiverReason]: z.string().trim().max(500).optional(),
});

export type Payment = z.infer<typeof PaymentSchema>;
export type PaymentState = ActionState<Payment>;
export type PaymentBooleanKey = BooleanKeys<Payment>;

export const PAYMENT_BOOLEAN_FIELDS = [
  "feeWaived",
] as const satisfies readonly PaymentBooleanKey[];
