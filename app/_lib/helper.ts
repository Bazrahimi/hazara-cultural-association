import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getStr = (fd: FormData, key: string) =>
  String(fd.get(key) ?? "").trim();

export const getNum = (fd: FormData, key: string) => {
  const v = Number(fd.get(key));
  return Number.isFinite(v) ? v : NaN; // let the schema catch invalids
};

// export const delay = async (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

export const NOTIFICATION_KEY = "app-toast";
export const NOTIFICATION_EVENT = "app-toast-event";

export const toBoolean = (raw: unknown): boolean => {
  return (
    raw === true || raw === "true" || raw === 1 || raw === "1" || raw === "on"
  );
};

export const AUS_STATES = [
  "VIC",
  "NSW",
  "QLD",
  "SA",
  "WA",
  "TAS",
  "ACT",
  "NT",
] as const;

// 1) Convert "event_date" -> "eventDate"
type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

// 2) Map object keys using CamelCase
export type CamelizeKeys<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
