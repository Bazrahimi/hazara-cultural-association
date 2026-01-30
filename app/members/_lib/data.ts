import { sql } from "@/app/_lib/db";
import { AddressRow, ProfileRow } from "./definitions";

export const getUserProfileRow = async (userId: number) => {
  const rows = await sql<ProfileRow[]>`
    SELECT
      first_name            AS "firstName",
      last_name             AS "lastName",
      phone                 AS "phone",

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
  const rows = await sql<AddressRow[]>`
    SELECT
      address1,
      address2,
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

