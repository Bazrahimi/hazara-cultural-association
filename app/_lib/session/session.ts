import { redirect } from "next/navigation";

import { AuthRoutes } from "../routes";
import type { DecodedSession } from "./schema";
import { getSession } from "./action";
import type { SessionRole } from "./sessionConfig";


/* ============ Public API ============ */

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



// /* ============ Public API Helper ============ */
// // Canonicalize roles coming from DB or call sites.
// const normalizeRoles = (
//   roles:
//     | SessionRole
//     | string
//     | ReadonlyArray<SessionRole | string>
//     | null
//     | undefined,
// ): SessionRole[] => {
//   const arr = roles == null ? [] : Array.isArray(roles) ? roles : [roles];
//   return Array.from(
//     new Set(
//       arr
//         .map((r) => (typeof r === "string" ? r.toLowerCase() : r))
//         .filter((r): r is SessionRole => ROLE_SET.has(r as string)),
//     ),
//   ).sort((a, b) => ROLES.indexOf(a) - ROLES.indexOf(b));
// };