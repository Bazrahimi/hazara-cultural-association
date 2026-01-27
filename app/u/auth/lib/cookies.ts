import { cookies } from "next/headers";
import {
  VERIFY_COOKIES,
  VerifyMode,
  type VerifyContext,
  type VerifyCookieEntry,
  type VerifyCookieKey,
} from "./definitions";

export const VERIFY_EMAIL_COOKIE_PATH = "/u";
const RESET_UID = "reset_uid";

const baseCookieOptions = {
  sameSite: "lax" as const,
  path: VERIFY_EMAIL_COOKIE_PATH,
  secure: process.env.NODE_ENV === "production",
};

const setCookie = async (
  name: VerifyCookieKey,
  value: string,
  opts?: { httpOnly?: boolean; maxAge?: number },
) => {
  (await cookies()).set(name, value, {
    ...baseCookieOptions,
    httpOnly: opts?.httpOnly ?? true,
    maxAge: opts?.maxAge,
  });
};

export const setVerifyCookies = async ({
  userId,
  email,
  mode,
  maxAgeSeconds = 10 * 60,
}: VerifyContext): Promise<VerifyContext> => {
  const expiresAtMs = Date.now() + maxAgeSeconds * 1000;

  const cookiesToSet: VerifyCookieEntry[] = [
    {
      key: VERIFY_COOKIES.uid,
      value: String(userId),
      httpOnly: true,
    },
    {
      key: VERIFY_COOKIES.email,
      value: email,
      httpOnly: true,
    },
    {
      key: VERIFY_COOKIES.mode,
      value: mode,
      httpOnly: true,
    },
    {
      key: VERIFY_COOKIES.exp,
      value: String(expiresAtMs),
      httpOnly: false, // UI-only
    },
  ];

  await Promise.all(
    cookiesToSet.map(({ key, value, httpOnly }) =>
      setCookie(key, value, {
        httpOnly,
        maxAge: maxAgeSeconds,
      }),
    ),
  );

  return { userId, email, mode, expiresAtMs };
};

export const readVerifyCookies = async (): Promise<VerifyContext | null> => {
  const store = await cookies();

  const uidStr = store.get(VERIFY_COOKIES.uid)?.value;
  const email = store.get(VERIFY_COOKIES.email)?.value;
  const mode = store.get(VERIFY_COOKIES.mode)?.value as VerifyMode;
  const expStr = store.get(VERIFY_COOKIES.exp)?.value;

  const userId = uidStr ? Number(uidStr) : NaN;
  const expiresAtMs = expStr ? Number(expStr) : NaN;

  if (
    !email ||
    !mode ||
    !Number.isFinite(userId) ||
    !Number.isFinite(expiresAtMs)
  )
    return null;

  return { userId, email, mode, expiresAtMs };
};

export const clearVerifyCookies = async () => {
  const store = await cookies();
  const clearOpts = { path: VERIFY_EMAIL_COOKIE_PATH, maxAge: 0 };

  for (const k of Object.values(VERIFY_COOKIES)) {
    store.set(k, "", clearOpts);
  }
};

export const setResetUid = async (userId: number, maxAgeSeconds = 10 * 60) => {
  const store = await cookies();
  store.set(RESET_UID, String(userId), {
    ...baseCookieOptions,
    httpOnly: true,
    maxAge: maxAgeSeconds,
  });
};

export const readResetUid = async (): Promise<number | null> => {
  const store = await cookies();
  const raw = store.get(RESET_UID)?.value;
  const id = raw ? Number(raw) : NaN;
  return Number.isFinite(id) ? id : null;
};

export const clearResetUid = async () => {
  const store = await cookies();
  store.set(RESET_UID, "", {
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: 0,
  });
};
