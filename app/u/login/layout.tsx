import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "../../lib/session";

export const metadata: Metadata = {
  title: "Login | Hazara Cultural Association",
  description: "Secure Login for Hazara Cultural Association",
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

  return <>{children}</>;
}
