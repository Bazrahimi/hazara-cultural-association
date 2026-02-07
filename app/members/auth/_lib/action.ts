// app/members/join/lib/action.ts
"use server";

import { toActionErrors } from "@/app/_lib/actionHelper";
import { toBoolean } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { getSession } from "@/app/_lib";
import { redirect } from "next/navigation";
import { upsertDefaultShippingAddress, upsertUserProfile } from "./data";

import { Join, JoinSchema, JoinState, PROFILE_BOOLEAN_FIELDS } from "./schema";

export const join = async (
  _prevState: JoinState | undefined,
  formData: FormData,
): Promise<JoinState> => {
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      ok: false,
      message: "You must be logged in to submit membership.",
    };
  }

  const rawData: Record<string, unknown> = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : undefined,
    ]),
  );

  for (const key of PROFILE_BOOLEAN_FIELDS) {
    rawData[key] = toBoolean(formData.get(key));
  }

  const parsed = JoinSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      ...toActionErrors<JoinState["errors"]>(parsed.error),
      data: rawData as Partial<Join>,
    };
  }

  const joinData = parsed.data;
  const userId = session.userId;

  try {
    await upsertUserProfile(userId, joinData);
    await upsertDefaultShippingAddress(userId, joinData);
  } catch (err) {
    console.error("createMember error", err);
    return {
      ok: false,
      message:
        "Something went wrong while saving your membership. Please try again.",
      data: parsed.data,
    };
  }

  redirect(MemberRoutes.checkout());
};
