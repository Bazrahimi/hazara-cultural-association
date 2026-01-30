// app/members/join/lib/dbTypes.ts

import { CamelizeKeys } from "@/app/_lib/helper";

// app/members/join/lib/dbTypes.ts

export type AddressType = "shipping" | "billing";
// ↑ adjust if your enum has more values

export type AddressesDbRow = {
  id: bigint;
  user_id: bigint;
  label: string | null;
  type: AddressType; // address_type enum
  is_default: boolean;
  address1: string;
  address2: string | null;
  suburb: string;
  state_code: string;
  postcode: string;
  country: string;
  created_at: Date;
  updated_at: Date;
};

type ProfileDbRow = {
  user_id: bigint;

  first_name: string | null;
  last_name: string | null;
  phone: string | null;

  created_at: Date;
  updated_at: Date;

  interest_blog: boolean;
  interest_store: boolean;
  newsletter_opt_in: boolean;
  virtual_meeting_opt_in: boolean;

  membership_tier: number | null; // smallint
  membership_fee: number | null; // integer
  fee_waived: boolean;

  membership_status: string; // text (enum-like)
  application_submitted_at: Date | null;
  application_reviewed_at: Date | null;
};

export type ProfileBase = CamelizeKeys<ProfileDbRow>;

export type ProfileRow = Pick<
  ProfileBase,
  | "firstName"
  | "lastName"
  | "phone"
  | "interestBlog"
  | "interestStore"
  | "newsletterOptIn"
  | "virtualMeetingOptIn"
>;

export type AddressBase = CamelizeKeys<AddressesDbRow>;

export type AddressRow = Pick<
  AddressBase,
  "address1" | "address2" | "suburb" | "postcode" | "stateCode" | "country"
>;
