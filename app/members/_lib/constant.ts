import {
  JoinAddressRow,
  ProfileRow,
  ProfileRowBooleanKey,
} from "./definitions";

export const ADDRESS_FIELDS = {
  suburb: "suburb",
  stateCode: "stateCode",
  postcode: "postcode",
  country: "country",
} as const satisfies Record<keyof JoinAddressRow, keyof JoinAddressRow>;

export const PROFILE_FIELDS = {
  firstName: "firstName",
  lastName: "lastName",
  phone: "phone",
  educationLevel: "educationLevel",
  occupation: "occupation",
  interestBlog: "interestBlog",
  newsletterOptIn: "newsletterOptIn",
  virtualMeetingOptIn: "virtualMeetingOptIn",
} as const satisfies Record<keyof ProfileRow, keyof ProfileRow>;

export const PROFILE_BOOLEAN_FIELDS = [
  "interestBlog",
  "newsletterOptIn",
  "virtualMeetingOptIn",
] as const satisfies readonly ProfileRowBooleanKey[];

export const EDUCATION_LEVEL_OPTIONS = [
  { label: "Not applicable", value: "na" },

  { label: "Primary school", value: "primary" },
  { label: "Year 10 or below", value: "year_10_or_below" },
  { label: "Year 12 / VCE", value: "year_12" },

  { label: "TAFE / Certificate / Diploma", value: "tafe" },
  { label: "Bachelor degree", value: "bachelor" },
  { label: "Postgraduate (Master / PhD)", value: "postgraduate" },

  { label: "Other", value: "other" },
] as const;
