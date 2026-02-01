export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ActionState<T> = {
  /** Optionally return back the user’s data so the form can re-fill */
  data?: Partial<T>;
  /** Per-field error arrays, keyed by T’s fields */
  errors?: FieldErrors<T>;
  /** UI convenience flags/text */
  message?: string;
  ok?: boolean;
};

export type BooleanKeys<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined | null> extends boolean ? K : never;
}[keyof T];


