"use server";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

/* ================================
   Single Source of Truth (Schema)
   ================================ */

const SessionSchema = z.object({
  userId: z.number(), // strictly number
  isAdmin: z.boolean().default(false),
  expiresAt: z
    .union([z.string().datetime(), z.date()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v)),
  extra: z.record(z.string(), z.unknown()).optional().default({}), // Zod 4 form
});

type SessionInput = z.input<typeof SessionSchema>;
type SessionNormalized = z.output<typeof SessionSchema>;
type DecodedSession = SessionNormalized &
  Required<Pick<JWTPayload, "iat" | "exp">>;

/* ================
   Config & helpers
   ================ */

const SESSION_COOKIE = "session";
const SESSION_DAYS = 7;
const alg = "HS256";

const secretKey = process.env.SESSION_SECRET ?? "dev-insecure-secret";
const encodedKey = new TextEncoder().encode(secretKey);

/* ===================
   Sign / Verify token
   =================== */

const signSession = async (payload: SessionNormalized): Promise<string> =>
  new SignJWT({
    userId: payload.userId,
    isAdmin: payload.isAdmin,
    expiresAt: payload.expiresAt.toISOString(),
    extra: payload.extra ?? {},
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(encodedKey);

const verifySession = async (token: string): Promise<DecodedSession | null> => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: [alg],
    });

    const parsed = SessionSchema.parse({
      userId: payload.userId,
      isAdmin: payload.isAdmin,
      expiresAt: payload.expiresAt,
      extra: payload.extra,
    });

    return {
      ...parsed,
      iat: payload.iat ?? 0,
      exp: payload.exp ?? 0,
    };
  } catch {
    return null;
  }
};

/* =============
   Public API
   ============= */

export const createSession = async (
  userId: number, // strictly number
  isAdmin = false,
  extra: Record<string, unknown> = {}
): Promise<void> => {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const payload = SessionSchema.parse({ userId, isAdmin, expiresAt, extra });

  const token = await signSession(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // friendlier for local dev
    sameSite: "lax",
    path: "/",
    expires: payload.expiresAt,
  });
};

export const destroySession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  redirect("/");
};

// Keep encrypt/decrypt for compatibility with existing call-sites
export const encrypt = async (payload: SessionInput): Promise<string> => {
  const normalized = SessionSchema.parse(payload);
  return signSession(normalized);
};

export const decrypt = async (
  session: string | undefined = ""
): Promise<DecodedSession | undefined> => {
  if (!session) return undefined;
  const v = await verifySession(session);
  return v ?? undefined;
};

/* =======================
   High-level auth helpers
   ======================= */

export const getSession = async (): Promise<DecodedSession | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  if (session.expiresAt.getTime() <= Date.now()) return null;
  return session;
};

export const requireUser = async (): Promise<DecodedSession> => {
  const s = await getSession();
  if (!s?.userId) redirect("/u/login");
  return s;
};

export const getUserId = async (): Promise<number | null> => {
  const s = await getSession();
  return s?.userId ?? null;
};
