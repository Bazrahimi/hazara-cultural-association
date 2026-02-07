import { JWTPayload } from "jose";
import z from "zod";
import { ROLES, SessionRole } from "./sessionConfig";

export const SessionSchema = z.object({
  userId: z.coerce.number(),
  roles: z.array(z.enum(ROLES)).default([]), // buyers have []
  expiresAt: z
    .union([z.iso.datetime(), z.date()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v)),
  extra: z.record(z.string(), z.unknown()).optional().default({}),
});

export type SessionInput = z.input<typeof SessionSchema>;
export type SessionNormalized = z.output<typeof SessionSchema>;
export type Session = z.infer<typeof SessionSchema>;

export type DecodedSession = SessionNormalized &
  Required<Pick<JWTPayload, "iat" | "exp">>;

export const normalizeRoles = (roles: unknown): SessionRole[] => {
  const arr = Array.isArray(roles) ? roles : roles == null ? [] : [roles];

  const cleaned = arr
    .map((r) => (typeof r === "string" ? r.toLowerCase() : ""))
    .filter((r): r is SessionRole => (ROLES as readonly string[]).includes(r));

  return [...new Set(cleaned)];
};
