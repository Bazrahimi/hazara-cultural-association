"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signSession, verifySession } from "./jwt";
import { SessionSchema, normalizeRoles, SessionInput, DecodedSession } from "./schema";
import type { SessionRole } from "./sessionConfig";
import { baseSessionCookie, SESSION as cs } from "./sessionConfig";

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

export const getSession = async (): Promise<DecodedSession | null> => {
  const token = (await cookies()).get(cs.cookieName)?.value;
  if (!token) return null;
  const s = await verifySession(token);
  if (!s) return null;
  if (s.expiresAt.getTime() <= Date.now()) return null;
  return s;
};