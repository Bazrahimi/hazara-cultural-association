//app/acount/setting/page.tsx
import { sql } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import type { Breadcrumb } from "@/app/lib/definitions";
import AddressesCard from "./ui/AddressesCard";

import ProfileCard from "./ui/ProfileCard";

import { requireUser } from "@/app/lib/auth";

import { Header } from "@/app/ui/global/Header";
import { AddressRecord, ProfileRecord, userRecord } from "./lib/definitions";
import { AddressesCardSkeleton, ProfileCardSkeleton } from "./ui/Skeleton";

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Dashboard",
    href: "/account",
  },
  {
    label: "Settings",
    href: "/account/settings",
    active: true,
  },
];

export default async function Page() {
  const user = await requireUser();
  if (!user.userId) redirect("/u/login");

  // Kick off queries in parallel, but DON'T await here
  const userPromise = sql<userRecord[]>`
    SELECT email FROM users WHERE id = ${user.userId} LIMIT 1;
  `;
  const profilePromise = sql<ProfileRecord[]>`
    SELECT
      first_name AS "firstName",
      last_name  AS "lastName",
      phone      AS "contactNumber"
    FROM user_profiles WHERE user_id = ${user.userId} LIMIT 1;
  `;
  const addressesPromise = sql<AddressRecord[]>`
    SELECT id::int, label, type, is_default, address1 AS address, address2, suburb,
           state_code AS "stateCode", postcode, country
    FROM user_addresses
    WHERE user_id = ${user.userId}
    ORDER BY is_default DESC, created_at DESC;
  `;

  return (
    <>
      {" "}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-8">
        <Header as="h1" className="my-3">
          Account Setting
        </Header>

        <div className="grid gap-8 md:grid-cols-2">
          <Suspense fallback={<ProfileCardSkeleton />}>
            <ProfileCard
              userPromise={userPromise}
              profilePromise={profilePromise}
            />
          </Suspense>

          <Suspense fallback={<AddressesCardSkeleton />}>
            <AddressesCard addressesPromise={addressesPromise} />
          </Suspense>
        </div>
      </div>
    </>
  );
}