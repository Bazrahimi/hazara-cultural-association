"use server";

import { getSession } from "@/app/_lib/session/session";
import { PaymentState } from "./definitions";

export const payment = async (
  _prev: PaymentState | undefined,
  formData: FormData,
) => {
  const session = await getSession();
  if (!session?.userId) {
    return { ok: false, message: "You must be logged in." };
  }
  console.log("FormData______", formData);
};
