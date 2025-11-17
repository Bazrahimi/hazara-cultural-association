import type { Metadata } from "next";
import { requireUser } from "../lib/session";

export const metaData: Metadata = {
  title: "Account Dashboard | HCA",
  description: "Secure Account Dashboard to view and manage your account",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireUser();

  return <>{children}</>;
};

export default Layout;
