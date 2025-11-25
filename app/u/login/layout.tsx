import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserId } from "../../lib/session";

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
  const userId = await getUserId();

  if (userId) {
    redirect("/account");
  }

  return <>{children}</>;
}
