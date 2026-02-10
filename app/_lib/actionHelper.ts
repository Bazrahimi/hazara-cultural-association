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



export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;


export type BooleanKeys<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined | null> extends boolean ? K : never;
}[keyof T];
