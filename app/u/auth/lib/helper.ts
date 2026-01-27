import { sql } from "@/app/lib/db";
import z from "zod";

export const toActionErrors = <TErrors>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: z.ZodError<any>,
  message = "Please review and correct the highlighted fields.",
): { ok: false; message: string; errors: TErrors } => {
  const { fieldErrors } = z.flattenError(error);

  return {
    ok: false,
    message,
    errors: fieldErrors as TErrors,
  };
};



export const buildFullName = (
  maybeFullName: string | null,
  email: string,
): string => {
  const trimmed = (maybeFullName ?? "").trim();
  if (trimmed.length > 0) return trimmed;
  return email.split("@")[0];
};
