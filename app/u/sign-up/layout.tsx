import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "../../lib/session";

export const metadata: Metadata = {
  title: "Sign up | Hazara Cultural Association",
  description: "Sign-up for a new account with HCA",
};

import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  // Redirect non-admins
  if (session?.isAdmin) {
    redirect("/admin");
  }

  if (session?.userId) redirect("/account");

  return <>{children}</>;
}
