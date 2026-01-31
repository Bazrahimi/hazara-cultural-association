// app/members/join/lib/action.ts
"use server";

import { toActionErrors } from "@/app/_lib/actionHelper";
import { toBoolean } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { getSession } from "@/app/_lib/session/session";
import { MEMBER_PRICE_ID } from "@/app/_lib/stripe";
import { redirect } from "next/navigation";
import { PAYMENT_BOOLEAN_FIELDS, PROFILE_BOOLEAN_FIELDS } from "./constant";
import {
  createMembershipPaymentRow,
  markMembershipPaymentRedirected,
  upsertDefaultShippingAddress,
  upsertFeeWaived,
  upsertUserProfile,
} from "./data";
import type { Join, JoinState, Payment, PaymentState } from "./definitions";
import { JoinSchema, PaymentSchema } from "./schema";
import { createMembershipCheckoutSession } from "./stripe";

export const join = async (
  _prevState: JoinState | undefined,
  formData: FormData,
): Promise<JoinState> => {
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      ok: false,
      message: "You must be logged in to submit membership.",
    };
  }

  const rawData: Record<string, unknown> = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : undefined,
    ]),
  );

  for (const key of PROFILE_BOOLEAN_FIELDS) {
    rawData[key] = toBoolean(formData.get(key));
  }

  const parsed = JoinSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      ...toActionErrors<JoinState["errors"]>(parsed.error),
      data: rawData as Partial<Join>,
    };
  }

  const joinData = parsed.data;
  const userId = session.userId;

  try {
    await upsertUserProfile(userId, joinData);
    await upsertDefaultShippingAddress(userId, joinData);
  } catch (err) {
    console.error("createMember error", err);
    return {
      ok: false,
      message:
        "Something went wrong while saving your membership. Please try again.",
      data: parsed.data,
    };
  }

  redirect(MemberRoutes.payment());
};

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
    priceId: MEMBER_PRICE_ID[paymentData.plan],
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
