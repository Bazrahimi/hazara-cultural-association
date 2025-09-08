import { getSession } from "@/app/lib/session";
import AccountMenuClient from "./AccountMenuClient";

export default async function AccountMenu() {
  const session = await getSession();

  const isLoggedIn = !!session;
  const isAdmin = !!session?.roles.includes("admin");
  return <AccountMenuClient isLoggedIn={isLoggedIn} isAdmin={isAdmin} />;
}
