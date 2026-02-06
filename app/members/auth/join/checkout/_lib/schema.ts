import { ActionState, BooleanKeys } from "@/app/_lib/actionHelper";
import z from "zod";
import { PAYMENT_FIELDS as payment, MEMBERSHIP_PLAN_KEY } from "./constant";
export const MembershipCheckoutSchema = z
  .object({
    [payment.paymentKey]: z.enum(MEMBERSHIP_PLAN_KEY, {
      message: "Please choose a membership option.",
    }),
    [payment.feeWaived]: z.boolean().optional(),
    [payment.waiverReason]: z.string().trim().max(500).optional(),
  })
  .refine((data) => Boolean(data[payment.waiverReason]?.length), {
    message: "Please Provide a short note for the fee waiver",
    path: [payment.waiverReason],
  });

export type MembershipCheckoutData = z.infer<typeof MembershipCheckoutSchema>;
export type MembershipCheckoutState = ActionState<MembershipCheckoutData>;
export type MembershipCheckoutBooleanKey = BooleanKeys<MembershipCheckoutData>;

export const PAYMENT_BOOLEAN_FIELDS = [
  "feeWaived",
] as const satisfies readonly MembershipCheckoutBooleanKey[];
