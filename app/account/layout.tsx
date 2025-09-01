import type { Metadata } from "next";
import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import { redirect } from "next/navigation";

export const metaData: Metadata = {
  title: "Account Dashboard | HCA",
  description: "Secure Account Dashboard to view and manage your account",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (!session) redirect("/u/login");
  if (session.isAdmin) redirect("/admin");
  
  return <>{children}</>;
};

export default Layout;
