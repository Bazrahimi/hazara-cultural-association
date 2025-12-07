"use server";

import { MemberState } from "./definitions";
import { parseMemberForm } from "./helper";

export const createMember = async (
  _prevState: MemberState | undefined,
  formdata: FormData
) => {
  const result = parseMemberForm(formdata);
};
