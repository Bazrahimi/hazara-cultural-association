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

export const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const NOTIFICATION_KEY = "app-toast";
export const NOTIFICATION_EVENT = "app-toast-event";

export const toBoolean = (raw: unknown): boolean => {
  return (
    raw === true || raw === "true" || raw === 1 || raw === "1" || raw === "on"
  );
};
