import { z } from "zod";

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

export const readFormFields = <T extends Record<string, string>>(
  formData: FormData,
  fields: T,
): { [K in keyof T]: FormDataEntryValue | null } => {
  const out = {} as { [K in keyof T]: FormDataEntryValue | null };

  for (const key in fields) {
    // key is string at runtime, but TS knows it’s keyof T in this loop
    const name = fields[key];
    out[key] = formData.get(name);
  }

  return out;
};

export const readStringFields = <T extends Record<string, string>>(
  formData: FormData,
  fields: T,
): { [K in keyof T]: string } => {
  const out = {} as { [K in keyof T]: string };

  for (const key in fields) {
    const name = fields[key];
    const v = formData.get(name);
    out[key] = typeof v === "string" ? v.trim() : "";
  }

  return out;
};

