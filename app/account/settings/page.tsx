// app/account/settings/page.tsx
import { sql } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { requireUser } from "@/app/lib/auth";
import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import { AddressRecord, ProfileRecord, userRecord } from "./lib/definitions";
import AddressesCard from "./ui/AddressesCard";
import AutoOpenModal from "./ui/AutoOpenModal";
import ProfileCard from "./ui/ProfileCard";
import { AddressesCardSkeleton, ProfileCardSkeleton } from "./ui/Skeleton";

const breadcrumbs: Breadcrumb[] = [
  { label: "Dashboard", href: "/account" },
  { label: "Settings", href: "/account/settings", active: true },
];

export default async function Page() {
  const user = await requireUser();
  if (!user.userId) redirect("/u/login");

  // These are the streamed data for the cards (unchanged)
  const userPromise = sql<userRecord[]>`
    SELECT email FROM users WHERE id = ${user.userId} LIMIT 1;
  `;
  const profilePromise = sql<ProfileRecord[]>`
    SELECT first_name AS "firstName",
           last_name  AS "lastName",
           phone      AS "contactNumber"
    FROM user_profiles
    WHERE user_id = ${user.userId}
    LIMIT 1;
  `;
  const addressesPromise = sql<AddressRecord[]>`
    SELECT id::int, label, type, is_default, address1 AS address, address2, suburb,
           state_code AS "stateCode", postcode, country
    FROM user_addresses
    WHERE user_id = ${user.userId}
    ORDER BY is_default DESC, created_at DESC;
  `;

  // --- Small, independent checks (await these) ---
  const profileCheckPromise = sql<
    {
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
    }[]
  >`
    SELECT first_name, last_name, phone
    FROM user_profiles
    WHERE user_id = ${user.userId}
    LIMIT 1;
  `;
  const addrCountPromise = sql<{ count: number }[]>`
    SELECT count(*)::int AS count
    FROM user_addresses
    WHERE user_id = ${user.userId};
  `;

  const [profileCheckRows, addrCountRows] = await Promise.all([
    profileCheckPromise,
    addrCountPromise,
  ]);
  const pc = profileCheckRows[0];
  const profileComplete = !!pc?.first_name && !!pc?.last_name && !!pc?.phone;
  const hasAnyAddress = (addrCountRows[0]?.count ?? 0) > 0;

  // Decide which modal (if any) to auto-open
  const target: "none" | "profile" | "addressNew" = !profileComplete
    ? "profile"
    : !hasAnyAddress
      ? "addressNew"
      : "none";

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {/* Auto-open modal once per tab if needed */}
      <AutoOpenModal target={target} />

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
