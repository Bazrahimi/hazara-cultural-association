import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import AccountMenuClient from "./AccountMenuClient";

export default async function AccountMenu() {
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  const isLoggedIn = Boolean(session?.userId);
  const isAdmin = Boolean(session?.isAdmin);

  // You can pass more (e.g., email/name) if you store them in the session
  return <AccountMenuClient isLoggedIn={isLoggedIn} isAdmin={isAdmin} />;
}
