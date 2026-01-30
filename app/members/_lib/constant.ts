import { AddressBase, ProfileBase } from "./definitions";
type ProfileFieldable = Omit<ProfileBase, "createdAt" | "updatedAt">;

type AddressFielable = Omit<
  AddressBase,
  "createdAt" | "updatedAt" | "label" | "type" | "isDefault"
>;

export const ADDRESS_FIELDS = {
  id: "id",
  userId: "userId",
  address1: "address1",
  address2: "address2",
  suburb: "suburb",
  stateCode: "stateCode",
  postcode: "postcode",
  country: "country",
} as const satisfies Record<keyof AddressFielable, keyof AddressFielable>;

export const PROFILE_FIELDS = {
  userId: "userId",

  firstName: "firstName",
  lastName: "lastName",
  phone: "phone",

  interestBlog: "interestBlog",
  interestStore: "interestStore",
  newsletterOptIn: "newsletterOptIn",
  virtualMeetingOptIn: "virtualMeetingOptIn",

  membershipTier: "membershipTier",
  membershipFee: "membershipFee",
  feeWaived: "feeWaived",

  membershipStatus: "membershipStatus",
  applicationSubmittedAt: "applicationSubmittedAt",
  applicationReviewedAt: "applicationReviewedAt",
} as const satisfies Record<keyof ProfileFieldable, keyof ProfileFieldable>;
