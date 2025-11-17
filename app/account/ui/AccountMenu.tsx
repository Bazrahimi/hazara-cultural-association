// app/ui/nav/AccountMenu.tsx
import { getSession } from "@/app/lib/session";
import AccountMenuClient from "./AccountMenuClient";

export type AccountMenuProps = {
  navLinkBase: string;
  navIcon: string;
  label?: string;
};

export default async function AccountMenu(props: AccountMenuProps) {
  const session = await getSession();

  const isAllowed = !!(session && session.roles.includes("admin"));

  const isLoggedIn = !!session;

  return (
    <AccountMenuClient
      {...props}
      isAllowed={isAllowed}
      isLoggedIn={isLoggedIn}
    />
  );
}
