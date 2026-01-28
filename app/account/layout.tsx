import type { Metadata } from "next";
import { redirectToLoginWithNext } from "../_lib/session/authRedirects";
import { getSession } from "../_lib/session/session";

export const metadata: Metadata = {
  title: "Account Dashboard | HCA",
  description: "Secure Account Dashboard to view and manage your account",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (!session?.userId) {
    await redirectToLoginWithNext("/account");
    // TODO please review why this not working on layout which is "/account"
  }

  return <>{children}</>;
};

export default Layout;
