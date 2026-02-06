"use server";
import { toActionErrors } from "@/app/_lib/actionHelper";
import { toBoolean } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { getSession } from "@/app/_lib/session/session";
import { STRIPE_PAYMENT as sp } from "@/app/_lib/stripe/stripePayment.public";
import { STRIPE_PAYMENT_ID as spi } from "@/app/_lib/stripe/stripePayment.server";

import { redirect } from "next/navigation";

import {
  Payment,
  PAYMENT_BOOLEAN_FIELDS,
  PaymentSchema,
  PaymentState,
} from "./schema";
import { createMembershipCheckoutSession } from "./stripe";

import {
  ensureMembershipPaymentRow,
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
  const amountCents =
    paymentData.paymentKey === sp.membership.monthly.paymentKey
      ? sp.membership.monthly.amountCents
      : sp.membership.annual.amountCents;
  const row = await ensureMembershipPaymentRow({
    userId,
    paymentPlanKey: paymentData.paymentKey,
    amountCents,
  });

  if (!row.email) {
  return {
    ok: false,
    message: "You already have a membership subscription. Please manage your membership.",
    data: rawData,
  };
}

  const checkout = await createMembershipCheckoutSession({
    paymentPlansKey: paymentData.paymentKey,
    priceId: spi[paymentData.paymentKey],
    customerEmail: row?.email,
    metadata: {
      paymentType: "membership",
      userId: userId,
      paymentRowId: row.id,
      paymentPlanKey: paymentData.paymentKey,
    },
  });

  await markMembershipPaymentRedirected({
    rowId: row.id,
    stripeCheckoutSessionId: checkout.id,
  });

  redirect(checkout.url!);
};
