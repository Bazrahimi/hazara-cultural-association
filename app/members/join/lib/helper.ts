import { toBoolean } from "@/app/_lib/helper";
import { JoinSchema } from "../../_lib/schema";
import { MemberInput, MemberState, ParseResult } from "./definitions";
import { Join } from "../../_lib/definitions";

export const parseMemberForm = (formData: FormData): ParseResult => {
  // Type raw as “shape of form”, so TS is happy with raw.firstName, etc.
  const raw = Object.fromEntries(formData.entries()) as Partial<
    Record<keyof Join, FormDataEntryValue>
  >;

  const parsed = JoinSchema.safeParse(raw);

  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  // Build typed fieldErrors in one go
  const { fieldErrors } = parsed.error.flatten();
  const errors = fieldErrors as MemberState["errors"];



  // Normalise what we send back to the client so the form can re-fill fields
  const normalizedData: Partial<MemberInput> = {
    firstName: (raw.firstName as string) ?? "",
    lastName: (raw.lastName as string) ?? "",
    phone: (raw.phone as string) ?? "",

    address1: (raw.address1 as string) ?? "",
    address2: (raw.address2 as string) ?? "",
    suburb: (raw.suburb as string) ?? "",
    stateCode: raw.stateCode as MemberInput["stateCode"] | undefined,
    postcode: (raw.postcode as string) ?? "",
    country: ((raw.country as string) ?? "AU") as MemberInput["country"],

    // Checkboxes – use same logic as schema (toBoolean)
    interestBlog: toBoolean(raw.interestBlog),
    interestStore: toBoolean(raw.interestStore),
    newsletterOptIn: toBoolean(raw.newsletterOptIn),
    virtualMeetingOptIn: toBoolean(raw.virtualMeetingOptIn),
  };

  return {
    ok: false,
    errors,
    normalizedData,
  };
};
