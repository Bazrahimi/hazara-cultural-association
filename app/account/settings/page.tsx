import { sql } from "@/app/lib/db";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import AddressesCard from "./ui/AddressesCard";

import ProfileCard from "./ui/ProfileCard";

import { AddressesCardSkeleton, ProfileCardSkeleton } from "./ui/Skeleton";

export default async function Page() {
  const jar = await cookies();
  const sessionCookie = jar.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  const userId = session?.userId ? Number(session.userId) : undefined;
  if (!userId) redirect("/u/login");

  // Kick off queries in parallel, but DON'T await here
  const userPromise = sql<{ email: string }[]>`
    SELECT email FROM users WHERE id = ${userId} LIMIT 1;
  `;
  const profilePromise = sql<
    {
      firstName: string | null;
      lastName: string | null;
      contactNumber: string | null;
    }[]
  >`
    SELECT
      first_name AS "firstName",
      last_name  AS "lastName",
      phone      AS "contactNumber"
    FROM user_profiles WHERE user_id = ${userId} LIMIT 1;
  `;
  const addressesPromise = sql<any[]>`
    SELECT id::int, label, type, is_default, address1 AS address, address2, suburb,
           state_code AS "stateCode", postcode, country
    FROM user_addresses
    WHERE user_id = ${userId}
    ORDER BY is_default DESC, created_at DESC;
  `;

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-8">
      {/* … header … */}

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
  );
}
