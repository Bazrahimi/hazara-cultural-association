// app/shop/cart/checkout/page.tsx
import type { FullAddress } from "@/app/(disabled)/_shop/lib/definitions";
import { sql } from "@/app/lib/db";
import { getUserId } from "@/app/lib/session/session";
import CheckoutPage from "./ui/CheckoutPage";
import LoggedInCheckout from "./ui/LoggedInCheckout";

export default async function Page() {
  const userId = await getUserId();
  if (!userId) return <CheckoutPage />;

  const users = await sql<{ email: string }[]>`
    SELECT email FROM users WHERE id = ${userId} LIMIT 1
  `;
  const email = users[0]?.email ?? "";

  const profiles = await sql<
    {
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
    }[]
  >`
    SELECT 
      first_name           AS "firstName", 
      last_name            AS "lastName", 
      phone                AS "ContactNumber"
    FROM user_profiles
    WHERE user_id = ${userId}
    LIMIT 1
  `;
  const profile = profiles[0] ?? {
    first_name: null,
    last_name: null,
    phone: null,
  };

  // Alias address1 AS address so it matches FullAddress.address
  const addrs = await sql<
    {
      id: number;
      label: string | null;
      address: string; // ← aliased
      address2: string | null;
      suburb: string;
      state_code: string;
      postcode: string;
    }[]
  >`
    SELECT
      id,
      label,
      address1 AS address,
      address2,
      suburb,
      state_code,
      postcode
    FROM user_addresses
    WHERE user_id = ${userId} AND is_default = true
    LIMIT 1
  `;

  const a = addrs[0] ?? null;

  const defaultAddress: (FullAddress & { id: number; label?: string }) | null =
    a
      ? {
          id: a.id,
          label: a.label ?? undefined,
          // FullAddress requires these:
          full: `${a.address}, ${a.suburb} ${a.state_code} ${a.postcode}`,
          address: a.address,
          address2: a.address2 ?? "",
          suburb: a.suburb,
          state: "", // if you store a separate full state name, map it here
          stateCode: a.state_code,
          postcode: a.postcode,
        }
      : null;

  return (
    <LoggedInCheckout
      userId={userId}
      email={email}
      profile={{
        firstName: profile.first_name ?? "",
        lastName: profile.last_name ?? "",
        phone: profile.phone ?? "",
      }}
      defaultAddress={defaultAddress}
    />
  );
}
