import { COOKIE_SAMESITE, COOKIE_SECURE } from "@/app/u/auth/_lib/constants";
import "server-only";
import { serverEnv } from "../env/server";

export const SESSION = {
  cookieName: "session" as const,
  algorithm: "HS256" as const,

  ttlMs: 12 * 60 * 60 * 1000,
  duration: "12h" as const,
} as const;

export const sessionEncodedKey = new TextEncoder().encode(
  serverEnv.sessionSecret,
);

export const ROLES = ["basic", "seller", "member", "blogger", "admin"] as const;

export const ROLE_SET = new Set<string>(ROLES);
export type SessionRole = (typeof ROLES)[number];

export const baseSessionCookie = {
  httpOnly: true,
  secure: COOKIE_SECURE,
  sameSite: COOKIE_SAMESITE,
  path: "/",
} as const;
