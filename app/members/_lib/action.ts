// app/members/join/lib/action.ts
"use server";

import { toActionErrors } from "@/app/_lib/actionHelper";
import { sql } from "@/app/_lib/db";
import { getSession } from "@/app/_lib/session/session";
import type { Join, JoinState } from "./definitions";
import { JoinSchema } from "./schema";

export const createMember = async (
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

  const rawData = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : undefined,
    ]),
  ) as Partial<Join>;

  const parsed = JoinSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      ...toActionErrors<JoinState["errors"]>(parsed.error),
      data: rawData,
    };
  }

  // const result = parseMemberForm(formData);
  // if (!result.ok) {
  //   return {
  //     ok: false,
  //     message: "Please fix the errors above.",
  //     errors: result.errors,
  //     data: result.normalizedData,
  //   };
  // }

  const member = parsed.data;
  const userId = session.userId;

  try {
    // 1) Upsert into user_profiles
    await sql`
      INSERT INTO user_profiles (
        user_id,
        first_name,
        last_name,
        phone,

        interest_blog,
        interest_store,
        newsletter_opt_in,
        virtual_meeting_opt_in,
        membership_status,
        application_submitted_at
      )
      VALUES (
        ${userId},
        ${member.firstName},
        ${member.lastName},
        ${member.phone},

        ${member.interestBlog},
        ${member.interestStore},
        ${member.newsletterOptIn},
        ${member.virtualMeetingOptIn},
        'pending',
        now()
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,

        interest_blog = EXCLUDED.interest_blog,
        interest_store = EXCLUDED.interest_store,
        newsletter_opt_in = EXCLUDED.newsletter_opt_in,
        virtual_meeting_opt_in = EXCLUDED.virtual_meeting_opt_in,
        updated_at = now();
    `;

    // 2) Upsert default shipping address in user_addresses
    // Uses the partial unique index: "user_addresses_one_default_per_user" UNIQUE (user_id) WHERE is_default
    await sql`
      INSERT INTO user_addresses (
        user_id,
        label,
        type,
        is_default,
        address1,
        address2,
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
        ${member.address1},
        ${member.address2 || null},
        ${member.suburb},
        ${member.stateCode},
        ${member.postcode},
        ${member.country}
      )
      ON CONFLICT (user_id) WHERE (is_default)
      DO UPDATE SET
        address1   = EXCLUDED.address1,
        address2   = EXCLUDED.address2,
        suburb     = EXCLUDED.suburb,
        state_code = EXCLUDED.state_code,
        postcode   = EXCLUDED.postcode,
        country    = EXCLUDED.country,
        updated_at = now();
    `;

    return {
      ok: true,
      message: "Thank you – your membership details have been submitted.",
      data: {}, // clear form if you want
    };
  } catch (err) {
    console.error("createMember error", err);
    return {
      ok: false,
      message:
        "Something went wrong while saving your membership. Please try again.",
      data: parsed.data,
    };
  }
};
