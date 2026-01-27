export const COOKIE_SAMESITE = "lax" as const;
export const COOKIE_SECURE = process.env.NODE_ENV === "production";
export const VERIFICATION_TTL_SECONDS = 10 * 60;
export const VERIFY_EMAIL_COOKIE_PATH = "/u";
