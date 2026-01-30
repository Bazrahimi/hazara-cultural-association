import { z } from "zod";
import { JoinSchema } from "../../_lib/schema";

export type MemberInput = z.infer<typeof JoinSchema>;

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

