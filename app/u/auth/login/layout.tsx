import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserId } from "../../../_lib/session/session";

export const metadata: Metadata = {
  title: "Login | " + ORG_PROFILE.orgName,
  description: "Secure Login for " + ORG_PROFILE.orgName,
};

import React from "react";
import { ORG_PROFILE } from "@/app/_lib/org/profile";

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
