import { toBoolean } from "@/app/_lib/helper";
import { MemberInput, MemberState, ParseResult } from "./definitions";
import { MemberSchema } from "./schema";

export const AGE_RANGES = {
  0: "Under 18",
  1: "18–24",
  2: "25–34",
  3: "35–44",
  4: "45–54",
  5: "55+",
} as const satisfies Record<number, string>;

export const PROFICIENCY_LEVELS = {
  0: "None",
  1: "Basic",
  2: "Conversational",
  3: "Fluent",
  4: "Native / Near-native",
} as const satisfies Record<number, string>;

export const parseMemberForm = (formData: FormData): ParseResult => {
  // Type raw as “shape of form”, so TS is happy with raw.firstName, etc.
  const raw = Object.fromEntries(formData.entries()) as Partial<
    Record<keyof MemberInput, FormDataEntryValue>
  >;

  const parsed = MemberSchema.safeParse(raw);

  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  // Build typed fieldErrors in one go
  const { fieldErrors } = parsed.error.flatten();
  const errors = fieldErrors as MemberState["errors"];

  // Helper to normalise numeric select values
  const toNum = (val: FormDataEntryValue | undefined) => {
    if (val == null) return undefined;
    const s = String(val);
    if (!s) return undefined;
    const n = Number(s);
    return Number.isNaN(n) ? undefined : n;
  };

  // Normalise what we send back to the client so the form can re-fill fields
  const normalizedData: Partial<MemberInput> = {
    firstName: (raw.firstName as string) ?? "",
    lastName: (raw.lastName as string) ?? "",
    phone: (raw.phone as string) ?? "",
    ageRange: toNum(raw.ageRange) as MemberInput["ageRange"] | undefined,

    englishProficiency: toNum(raw.englishProficiency) as
      | MemberInput["englishProficiency"]
      | undefined,

    farsiHazaragiProficiency: toNum(raw.farsiHazaragiProficiency) as
      | MemberInput["farsiHazaragiProficiency"]
      | undefined,

    address1: (raw.address1 as string) ?? "",
    address2: (raw.address2 as string) ?? "",
    suburb: (raw.suburb as string) ?? "",
    stateCode: raw.stateCode as MemberInput["stateCode"] | undefined,
    postCode: (raw.postCode as string) ?? "",
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
