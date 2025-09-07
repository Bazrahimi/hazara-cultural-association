import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "../lib/session";

export const metaData: Metadata = {
  title: "Account Dashboard | HCA",
  description: "Secure Account Dashboard to view and manage your account",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireUser();
  console.log(session)

  if (session.roles.includes("admin")) redirect("/admin");

  return <>{children}</>;
};

export default Layout;
