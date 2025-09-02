import z from "zod";

import { AddressSchema } from "./schema";

export type AddressInput = z.infer<typeof AddressSchema>;
export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type AddressState = {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors<AddressInput>;
  data?: Partial<AddressInput>;
};
