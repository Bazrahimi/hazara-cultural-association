// app/admin/layout.tsx

import type { Metadata } from "next";
import { requireAdmin } from "../lib/session";

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
  await requireAdmin();

  return <>{children}</>;
};

export default Layout;
