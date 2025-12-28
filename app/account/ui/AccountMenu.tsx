// app/ui/nav/AccountMenu.tsx
import { getSession } from "@/app/lib/session/session";
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
  const fullName = String(session?.extra.fullName ?? "");
  const initials =
    fullName
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || null;

  return (
    <AccountMenuClient
      {...props}
      isAllowed={isAllowed}
      isLoggedIn={isLoggedIn}
      initials={initials}
    />
  );
}
