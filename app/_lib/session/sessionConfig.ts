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

// import { COOKIE_SAMESITE, COOKIE_SECURE } from "@/app/u/auth/_lib/constants";

// // app/lib/session/sessionConfig.ts
// export const SESSION_COOKIE = "session" as const;

// export const SESSION_ALG = "HS256" as const;

// // 12 hours in ms
// export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

// // JOSE accepts "12h" style strings for exp
// export const SESSION_DURATION = "12h" as const;

// // Centralised cookie options (useful in both create/destroy)
// export function sessionCookieOptions(expires?: Date) {
//   return {
//     httpOnly: true,
//     secure: COOKIE_SECURE,
//     sameSite: COOKIE_SAMESITE,
//     path: "/",
//     ...(expires ? { expires } : {}),
//   };
// }
