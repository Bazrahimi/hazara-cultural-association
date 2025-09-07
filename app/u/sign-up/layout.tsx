import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserId } from "../../lib/session";

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
  const userId = await getUserId();


  if (userId) redirect("/account");

  return <>{children}</>;
}
