// app/lib/auth.ts
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  if (!session?.userId) redirect("/u/login");
  return { userId: Number(session.userId), isAdmin: !!session.isAdmin };
}

