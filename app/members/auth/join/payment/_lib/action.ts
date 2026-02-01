"use server";
import { toActionErrors } from "@/app/_lib/actionHelper";
import { toBoolean } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { getSession } from "@/app/_lib/session/session";
import { redirect } from "next/navigation";


import { Payment, PaymentSchema, PaymentState, PAYMENT_BOOLEAN_FIELDS } from "./schema";
import {
  createMembershipCheckoutSession,
  MEMBERSHIP_PAYMENT_ID,
} from "./stripe";

import {
  createMembershipPaymentRow,
  markMembershipPaymentRedirected,
  upsertFeeWaived,
} from "./data";

export const payment = async (
  _prev: PaymentState | undefined,
  formData: FormData,
): Promise<PaymentState | undefined> => {
  const session = await getSession();
  if (!session?.userId) {
    return { ok: false, message: "You must be logged in." };
  }

  const rawData: Record<string, unknown> = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : undefined,
    ]),
  );

  for (const key of PAYMENT_BOOLEAN_FIELDS) {
    rawData[key] = toBoolean(formData.get(key));
  }

  const parsed = PaymentSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      ...toActionErrors<PaymentState["errors"]>(parsed.error),
      data: rawData as Partial<Payment>,
    };
  }

  const paymentData = parsed.data;
  const userId = session.userId;

  if (paymentData.feeWaived) {
    await upsertFeeWaived(userId);
    redirect(`${MemberRoutes.paymentSuccess()}?waiver=1`);
  }
  const amountCents = paymentData.plan === "monthly" ? 1000 : 11500;
  const row = await createMembershipPaymentRow({
    userId,
    plan: paymentData.plan,
    amountCents,
  });
  const checkout = await createMembershipCheckoutSession({
    plan: paymentData.plan,
    priceId: MEMBERSHIP_PAYMENT_ID[paymentData.plan],
    customerEmail: row.email,
    metadata: {
      userId: String(userId),
      paymentRowId: String(row.id),
      plan: paymentData.plan,
    },
  });

  await markMembershipPaymentRedirected({
    rowId: row.id,
    stripeCheckoutSessionId: checkout.id,
  });

  redirect(checkout.url!);
};
