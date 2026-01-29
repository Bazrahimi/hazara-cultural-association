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
) => {
  return Object.fromEntries(
    Object.entries(fields).map(([key, name]) => [key, formData.get(name)]),
  ) as {
    [K in keyof T]: FormDataEntryValue | null;
  };
};
