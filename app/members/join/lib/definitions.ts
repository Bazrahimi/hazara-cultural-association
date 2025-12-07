import { z } from "zod";
import { AGE_RANGES, PROFICIENCY_LEVELS } from "./helper";
import { MemberSchema } from "./schema";

export type MemberInput = z.infer<typeof MemberSchema>;

export type MemberState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof MemberInput, string[]>>;
  data?: Partial<MemberInput>;
  success?: { message: string };
};

export type ParseResult =
  | {
      ok: true;
      data: MemberInput;
    }
  | {
      ok: false;
      errors: MemberState["errors"];
      normalizedData: Partial<MemberInput>;
    };

export type ProficiencyLevel = keyof typeof PROFICIENCY_LEVELS & number;
export type AgeRange = keyof typeof AGE_RANGES & number;
