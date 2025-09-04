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
