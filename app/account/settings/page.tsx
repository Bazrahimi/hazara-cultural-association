// app/account/settings/page.tsx
import { sql } from "@/app/lib/db";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

import ProfileCard from "./ui/ProfileCard";
import AddressesCard from "./ui/AddressesCard";

import type { AddressRecord, ProfileRecord } from "./lib/definitions";

export const metadata = { title: "Account Settings" };

export default async function Page() {
  // --- Auth ---
  const jar = await cookies();
  const sessionCookie = jar.get("session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  const userId = session?.userId ? Number(session.userId) : undefined;
  if (!userId) redirect("/u/login");

  // --- Concurrent DB fetches ---
  const [userRows, profileRows, addressRows] = await Promise.all([
    sql<
      { email: string }[]
    >`SELECT email FROM users WHERE id = ${userId} LIMIT 1;`,
    sql<ProfileRecord[]>`
      SELECT
        first_name AS "firstName",
        last_name  AS "lastName",
        phone      AS "contactNumber"
      FROM user_profiles
      WHERE user_id = ${userId}
      LIMIT 1;
    `,
    sql<AddressRecord[]>`
      SELECT 
        id::int,
        label,
        type,
        is_default,
        address1   AS address,
        address2,
        suburb,
        state_code AS "stateCode",
        postcode,
        country
      FROM user_addresses
      WHERE user_id = ${userId}
      ORDER BY is_default DESC, created_at DESC;
    `,
  ]);

  const email = userRows[0]?.email ?? "";
  const profile = profileRows[0] ?? {
    firstName: null,
    lastName: null,
    contactNumber: null,
  };
  const addresses = addressRows;

  // Completion hints
  const profileComplete =
    !!profile.firstName && !!profile.lastName && !!profile.contactNumber;
  const hasAnyAddress = addresses.length > 0;
  const hasDefaultAddress = addresses.some((a) => a.is_default);
  const needsAttention =
    !profileComplete || !hasAnyAddress || !hasDefaultAddress;

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-8">
      <header>
        <Header as="h1">Account Settings</Header>
        <P className="mt-1 text-gray-600">
          Manage your profile and addresses used for faster checkout.
        </P>
      </header>

      {needsAttention && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Almost there!</span>{" "}
            {!profileComplete ? "Complete your profile" : ""}
            {!profileComplete && (!hasAnyAddress || !hasDefaultAddress)
              ? " and "
              : ""}
            {!hasAnyAddress
              ? "add an address"
              : !hasDefaultAddress
                ? "set a default address"
                : ""}{" "}
            to finish setting up your account.
          </p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <ProfileCard email={email} profile={profile} />
        <AddressesCard addresses={addresses} />
      </div>
    </div>
  );
}
