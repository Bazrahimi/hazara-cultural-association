import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AccountRoutes, AuthRoutes } from "../routes";
import { PROTECTED_ROUTE_PREFIXES } from "./protectedRoutes";

export const safeAccountNext = (input: unknown): string => {
  if (!input) return AccountRoutes.root();

  let decoded = String(input);

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return AccountRoutes.root();
  }

  // must be a relative path
  if (!decoded.startsWith("/")) return AccountRoutes.root();

  // must start with an allowed
  const isAllowed = PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => decoded === prefix || decoded.startsWith(prefix + "/"),
  );

  return isAllowed ? decoded : AccountRoutes.root();
};

export const redirectToLoginWithNext = async (fallbackNext = "/") => {
  const h = headers();
  const pathname = (await h).get("x-pathname") ?? fallbackNext;
  redirect(`${AuthRoutes.login()}?next=${encodeURIComponent(pathname)}`);
};
