import { ActionState } from "@/app/_lib/definitions";
import z from "zod";
import { PaymentSchema } from "./schema";

export type Payment = z.infer<typeof PaymentSchema>;
export type PaymentState = ActionState<Payment>;
