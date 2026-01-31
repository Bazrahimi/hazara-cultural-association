import { sql } from "@/app/_lib/db";
import type { Join, JoiningPlan } from "./definitions";
import { JoinAddressRow, ProfileRow } from "./definitions";

export const getUserProfileRow = async (userId: number) => {
  const rows = await sql<ProfileRow[]>`
    SELECT
      first_name            AS "firstName",
      last_name             AS "lastName",
      phone                 AS "phone",
      education_level       AS "educationLevel",
      occupation            AS "occupation",
      interest_blog         AS "interestBlog",
      interest_store        AS "interestStore",
      newsletter_opt_in     AS "newsletterOptIn",
      virtual_meeting_opt_in AS "virtualMeetingOptIn"
    FROM user_profiles
    WHERE user_id = ${userId}
    LIMIT 1
  `;

  return rows[0] ?? null;
};

export const getDefaultAddressRow = async (userId: number) => {
  const rows = await sql<JoinAddressRow[]>`
    SELECT
      suburb,
      state_code AS "stateCode",
      postcode,
      country
    FROM user_addresses
    WHERE user_id = ${userId}
      AND is_default = true
    LIMIT 1
  `;

  return rows[0] ?? null;
};

export async function upsertUserProfile(userId: number, join: Join) {
  await sql`
    INSERT INTO public.user_profiles (
      user_id,
      first_name,
      last_name,
      phone,
      occupation,
      education_level,
      interest_blog,
      newsletter_opt_in,
      virtual_meeting_opt_in,
      application_submitted_at
    )
    VALUES (
      ${userId},
      ${join.firstName},
      ${join.lastName ?? null},
      ${join.phone ?? null},
      ${join.occupation ?? null},
      ${join.educationLevel ?? null},
      ${join.interestBlog},
      ${join.newsletterOptIn},
      ${join.virtualMeetingOptIn},
      now()
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      phone = EXCLUDED.phone,
      occupation = EXCLUDED.occupation,
      education_level = EXCLUDED.education_level,
      interest_blog = EXCLUDED.interest_blog,
      newsletter_opt_in = EXCLUDED.newsletter_opt_in,
      virtual_meeting_opt_in = EXCLUDED.virtual_meeting_opt_in,
      application_submitted_at = EXCLUDED.application_submitted_at,
      updated_at = now();
  `;
}

export async function upsertDefaultShippingAddress(userId: number, join: Join) {
  await sql`
    INSERT INTO public.user_addresses (
      user_id,
      label,
      type,
      is_default,
      suburb,
      state_code,
      postcode,
      country
    )
    VALUES (
      ${userId},
      'Primary',
      'shipping',
      true,
      ${join.suburb},
      ${join.stateCode},
      ${join.postcode},
      ${join.country ?? "AU"}
    )
    ON CONFLICT (user_id) WHERE (is_default)
    DO UPDATE SET
      suburb     = EXCLUDED.suburb,
      state_code = EXCLUDED.state_code,
      postcode   = EXCLUDED.postcode,
      country    = EXCLUDED.country,
      updated_at = now();
  `;
}

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
  plan: JoiningPlan;
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
      plan,
      amount_cents,
      status
    )
    SELECT
      u.id,
      ${params.plan},
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
