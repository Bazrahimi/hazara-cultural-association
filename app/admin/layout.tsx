// app/admin/layout.tsx

import type { Metadata } from "next";
import { redirectToLoginWithNext } from "../lib/session/authRedirects";
import { getSession } from "../lib/session/session";

export const metadata: Metadata = {
  title: "Admin Dashboard | HCA",
  description: "Secure Administrative dashboard to view and manage the website",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (!session?.roles.includes("admin")) {
    redirectToLoginWithNext("/admin");
  }

  return <>{children}</>;
};

export default Layout;
