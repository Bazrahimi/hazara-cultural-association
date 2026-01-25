import { AccountRoutes } from "../routes";
import { PROTECTED_ROUTE_PREFIXES } from "./protectedRoutes";

export const safeAccountNext = (input: unknown): string => {
  if (!input) return AccountRoutes.root();

  console.log("input", input)

  let decoded = String(input);

   console.log("decode", decoded)

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
