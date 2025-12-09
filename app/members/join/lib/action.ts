"use server";

import { sql } from "@/app/lib/db";
import { MemberState } from "./definitions";
import { parseMemberForm } from "./helper";

export const createMember = async (
  _prevState: MemberState | undefined,
  formdata: FormData
): Promise<MemberState> => {
  const result = parseMemberForm(formdata);
  if (!result.ok) {
    return {
      ok: false,
      message: "Please fix the error above.",
      errors: result.errors,
      data: result.normalizedData,
    };
  }

  const member = result.data;

  try {
    await sql`

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
      data: result.data, // keep values if you want
    };
  }
};
