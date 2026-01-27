import { cookies } from "next/headers";
import {
  VERIFY_COOKIES,
  VerifyMode,
  type VerifyContext,
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

  await Promise.all([
    setCookie(VERIFY_COOKIES.uid, String(userId), {
      httpOnly: true,
      maxAge: maxAgeSeconds,
    }),
    setCookie(VERIFY_COOKIES.email, email, {
      httpOnly: true,
      maxAge: maxAgeSeconds,
    }),
    setCookie(VERIFY_COOKIES.mode, mode, {
      httpOnly: true,
      maxAge: maxAgeSeconds,
    }),
    // UI-only cookie (readable in client)
    setCookie(VERIFY_COOKIES.exp, String(expiresAtMs), {
      httpOnly: false,
      maxAge: maxAgeSeconds,
    }),
  ]);

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

  store.set(VERIFY_COOKIES.uid, "", clearOpts);
  store.set(VERIFY_COOKIES.email, "", clearOpts);
  store.set(VERIFY_COOKIES.mode, "", clearOpts);
  store.set(VERIFY_COOKIES.exp, "", clearOpts);
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
