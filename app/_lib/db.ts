// app/lib/db.ts  (no "use server" here)
import postgres from "postgres";
import { processEnv } from "./processEnv";

declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}

const _sql =
  global.__sql ??
  postgres(processEnv.postgresUrl, {
    ssl: "require",
    max: 5, // keep this low on Neon free tier
    idle_timeout: 20, // seconds
  });

if (!global.__sql) global.__sql = _sql;

export const sql = _sql;

export type SqlClient = typeof sql;

export type SqlFragment = ReturnType<SqlClient>;

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
