"use server";

/**
 * Session (multi-role)
 * - userId: number
 * - roles: ['seller'|'volunteer'|'blogger'|'admin'][]   (empty [] = authenticated buyer)
 */

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  baseSessionCookie,
  SESSION as cs,
  sessionEncodedKey,
} from "./sessionConfig";

import { AuthRoutes } from "../routes";

/* ============ Single source of truth (schema) ============ */

const ROLES = ["basic", "seller", "member", "blogger", "admin"] as const;
const ROLE_SET = new Set<string>(ROLES);
export type SessionRole = (typeof ROLES)[number];

const SessionSchema = z.object({
  userId: z.coerce.number(),
  roles: z.array(z.enum(ROLES)).default([]), // buyers have []
  expiresAt: z
    .union([z.iso.datetime(), z.date()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v)),
  extra: z.record(z.string(), z.unknown()).optional().default({}),
});

type SessionInput = z.input<typeof SessionSchema>;
type SessionNormalized = z.output<typeof SessionSchema>;
type DecodedSession = SessionNormalized &
  Required<Pick<JWTPayload, "iat" | "exp">>;

/* ============ Sign / Verify ============ */

const signSession = async (payload: SessionNormalized): Promise<string> =>
  new SignJWT({
    userId: payload.userId,
    roles: payload.roles,
    expiresAt: payload.expiresAt.toISOString(),
    extra: payload.extra ?? {},
  })
    .setProtectedHeader({ alg: cs.algorithm })
    .setIssuedAt()
    .setExpirationTime(cs.duration)
    .sign(sessionEncodedKey);

const verifySession = async (token: string): Promise<DecodedSession | null> => {
  try {
    const { payload } = await jwtVerify(token, sessionEncodedKey, {
      algorithms: [cs.algorithm],
    });
    const parsed = SessionSchema.parse({
      userId: payload.userId,
      roles: payload.roles,
      expiresAt: payload.expiresAt,
      extra: payload.extra,
    });
    return { ...parsed, iat: payload.iat ?? 0, exp: payload.exp ?? 0 };
  } catch {
    return null;
  }
};

/* ============ Public API Helper ============ */
// Canonicalize roles coming from DB or call sites.
const normalizeRoles = (
  roles:
    | SessionRole
    | string
    | ReadonlyArray<SessionRole | string>
    | null
    | undefined,
): SessionRole[] => {
  const arr = roles == null ? [] : Array.isArray(roles) ? roles : [roles];
  return Array.from(
    new Set(
      arr
        .map((r) => (typeof r === "string" ? r.toLowerCase() : r))
        .filter((r): r is SessionRole => ROLE_SET.has(r as string)),
    ),
  ).sort((a, b) => ROLES.indexOf(a) - ROLES.indexOf(b));
};

/* ============ Public API ============ */

export const createSession = async (
  userId: number | string, // allow raw '10' from DB
  roles: SessionRole | string | ReadonlyArray<SessionRole | string> = [],
  extra: Record<string, unknown> = {},
): Promise<void> => {
  const expiresAt = new Date(Date.now() + cs.ttlMs);

  const payload = SessionSchema.parse({
    userId, // z.coerce.number() will normalize
    roles: normalizeRoles(roles), // sanitize/dedupe/filter/sort roles
    expiresAt,
    extra,
  });

  const token = await signSession(payload);
  const jar = await cookies();
  jar.set(cs.cookieName, token, {
    ...baseSessionCookie,
    expires: payload.expiresAt,
  });
};

export const destroySession = async (): Promise<void> => {
  const jar = await cookies();
  jar.set(cs.cookieName, "", {
    ...baseSessionCookie,
    expires: new Date(0),
  });
  redirect("/");
};

// Optional: keep these if other code calls them (no legacy mapping)
export const encrypt = async (payload: SessionInput): Promise<string> => {
  const normalized = SessionSchema.parse(payload);
  return signSession(normalized);
};

export const decrypt = async (
  session: string | undefined = "",
): Promise<DecodedSession | undefined> => {
  if (!session) return undefined;
  const v = await verifySession(session);
  return v ?? undefined;
};

/* ============ High-level helpers ============ */

export const getSession = async (): Promise<DecodedSession | null> => {
  const token = (await cookies()).get(cs.cookieName)?.value;
  if (!token) return null;
  const s = await verifySession(token);
  if (!s) return null;
  if (s.expiresAt.getTime() <= Date.now()) return null;
  return s;
};

export const requireUser = async (): Promise<DecodedSession> => {
  const s = await getSession();
  if (!s?.userId) redirect(AuthRoutes.login());
  return s;
};

export const getUserId = async (): Promise<number | null> => {
  const s = await getSession();
  return s?.userId ?? null;
};

// auth helper
export const requireAdmin = async () => {
  const s = await requireUser(); // redirects to /u/login if missing

  if (!s.roles.includes("admin")) redirect("/account"); // or "/not-authorized"
  return s;
};

/* ============ Role helpers ============ */

export const isAdmin = async (): Promise<boolean> => {
  const s = await getSession();
  return !!s?.roles.includes("admin");
};

export const hasAnyRole = async (
  required: SessionRole | SessionRole[],
): Promise<boolean> => {
  const req = Array.isArray(required) ? required : [required];
  const s = await getSession();
  if (!s) return false;
  return s.roles.some((r) => req.includes(r));
};

export const hasAllRoles = async (
  required: SessionRole | SessionRole[],
): Promise<boolean> => {
  const req = Array.isArray(required) ? required : [required];
  const s = await getSession();
  if (!s) return false;
  return req.every((r) => s.roles.includes(r));
};

export const isBuyer = async (): Promise<boolean> => {
  const s = await getSession();
  return !!s && s.roles.length === 0;
};
