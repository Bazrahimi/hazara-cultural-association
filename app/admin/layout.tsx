// app/admin/layout.tsx
// question: i have applied to logic that check my session here if it admin stay other wise redirect to the laging. however, it seem the app is redirecting any from "/admin" route. however it is redirect from child route. "/admin/test/page.tsx". it seem the layout is not refreshing every now than
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
