import { sql } from "@/app/_lib/db";
import { PaymentPlansKey } from "./definitions";

export const upsertFeeWaived = async (userId: number) => {
  await sql`
    UPDATE user_profiles
    SET
      fee_waived = true,
      updated_at = now()
    WHERE user_id = ${userId}
  `;
};

export async function createMembershipPaymentRow(params: {
  userId: number;
  paymentPlansKey: PaymentPlansKey;
  amountCents: number;
}) {
  const rows = await sql<
    {
      id: number;
      email: string;
    }[]
  >`
    INSERT INTO membership_payments (
      user_id,
      payment_plan_key,
      amount_cents,
      status
    )
    SELECT
      u.id,
      ${params.paymentPlansKey},
      ${params.amountCents},
      'created'
    FROM users u
    WHERE u.id = ${params.userId}
    RETURNING
      id,
      (SELECT email FROM users WHERE id = ${params.userId}) AS email
  `;

  return rows[0];
}

export async function markMembershipPaymentRedirected(params: {
  rowId: number;
  stripeCheckoutSessionId: string;
}) {
  await sql`
    UPDATE membership_payments
    SET
      stripe_checkout_session_id = ${params.stripeCheckoutSessionId},
      status = 'redirected',
      updated_at = now()
    WHERE id = ${params.rowId}
  `;
}

export const getMembershipPaymentStatus = async (rowId: number) => {
  const rows = await sql<{ status: string }[]>`
    SELECT
      status
    FROM
      membership_payments
    WHERE
      id =${rowId}
  `;
  return rows[0]?.status ?? null;
};

export const markMembershipPaymentPaid = async (params: {
  rowId: number;
  paymentIntentId: string;
  customerId: string;
  subscriptionId: string;
}) => {
  await sql`
    UPDATE
      membership_payments
    SET
      status = "paid",
      stripe_payment_intent_id = ${params.paymentIntentId},
      stripe_customer_id = ${params.customerId},
      stripe_subscription_id = ${params.subscriptionId},
      updated_at = now()
    WHERE
      id = ${params.rowId}
  `;
};

export const setUserMembershipActive = async (userId: number) => {
  await sql`
    UPDATE
      user_profiles
    SET
      membership_status = "active,
      update_at = now()
    WHERE
      user_id = ${userId}
  `;
};
