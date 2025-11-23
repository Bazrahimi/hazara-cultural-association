import { cookies } from "next/headers";
export const VERIFY_EMAIL_COOKIE_PATH = "/u";

export type VerifyMode = "login" | "signup" | "reset";

type SetVerifyCookiesOption = {
  userId: number;
  email: string;
  mode: VerifyMode;
  MaxAgeSeconds?: number;
};

export const setVerifyCookies = async ({
  userId,
  email,
  mode,
  MaxAgeSeconds = 10 * 60, // 10 minutes
}: SetVerifyCookiesOption) => {
  const cookiesStore = await cookies();

  cookiesStore.set("verify_uid", String(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: MaxAgeSeconds,
  });

  cookiesStore.set("verify_email", email, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: MaxAgeSeconds,
  });

  cookiesStore.set("verify_mode", mode, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: VERIFY_EMAIL_COOKIE_PATH,
    maxAge: MaxAgeSeconds,
  });
};
