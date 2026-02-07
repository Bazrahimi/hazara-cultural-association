import { SignJWT, jwtVerify } from "jose";
import { DecodedSession, SessionNormalized, SessionSchema } from "./schema";
import { SESSION, sessionEncodedKey } from "./sessionConfig";

export const signSession = async (payload: SessionNormalized): Promise<string> =>
  new SignJWT({
    userId: payload.userId,
    roles: payload.roles,
    expiresAt: payload.expiresAt.toISOString(),
    extra: payload.extra ?? {},
  })
    .setProtectedHeader({ alg: SESSION.algorithm })
    .setIssuedAt()
    .setExpirationTime(SESSION.duration)
    .sign(sessionEncodedKey);

export const verifySession = async (token: string): Promise<DecodedSession | null> => {
  try {
    const { payload } = await jwtVerify(token, sessionEncodedKey, {
      algorithms: [SESSION.algorithm],
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
