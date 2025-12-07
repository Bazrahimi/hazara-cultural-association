import { toBoolean } from "@/app/lib/helper";
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
  const raw = Object.fromEntries(formData.entries());
  const parsed = MemberSchema.safeParse(raw);

  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  const fieldErrors: MemberState["errors"] = {};

  for (const issue of parsed.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string") {
      const key = field as keyof MemberInput;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key]!.push(issue.message);
    }
  }

  // Normalise what we send back to the client so the form can re-fill fields
  const normalizedData: Partial<MemberInput> = {
    firstName: (raw.firstName as string) ?? "",
    lastName: (raw.lastName as string) ?? "",

    country: (raw.country as MemberInput["country"]) ?? "AU",

    stateCode: (raw.stateCode as MemberInput["stateCode"]) ?? undefined,

    postCode: (raw.postCode as string) ?? "",
    phone: (raw.phone as string) ?? "",

    ageRange: raw.ageRange as MemberInput["ageRange"] | undefined,

    englishProficiency:
      (raw.englishProficiency as MemberInput["englishProficiency"]) ??
      undefined,

    farsiHazaragiProficiency:
      (raw.farsiHazaragiProficiency as MemberInput["farsiHazaragiProficiency"]) ??
      undefined,

    // Checkboxes – use same logic as schema (toBoolean)
    interestBlog: toBoolean(raw.interestBlog),
    interestStore: toBoolean(raw.interestStore),
    newsletterOptIn: toBoolean(raw.newsletterOptIn),
    virtualMeetingOptIn: toBoolean(raw.virtualMeetingOptIn),
  };

  return {
    ok: false,
    errors: fieldErrors,
    normalizedData,
  };
};
