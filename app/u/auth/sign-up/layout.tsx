import { ORG_PROFILE } from "@/app/_lib/org/profile";
import { getUserId } from "@/app/_lib/session/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign up | " + +ORG_PROFILE.orgName,
  description: "Sign-up for a new account with " + ORG_PROFILE.orgName,
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
