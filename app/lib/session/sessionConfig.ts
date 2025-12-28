// app/lib/session/sessionConfig.ts
export const SESSION_COOKIE = "session" as const;

export const SESSION_ALG = "HS256" as const;

// 12 hours in ms
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

// JOSE accepts "12h" style strings for exp
export const SESSION_DURATION = "12h" as const;

// Centralised cookie options (useful in both create/destroy)
export function sessionCookieOptions(expires?: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    ...(expires ? { expires } : {}),
  };
}
