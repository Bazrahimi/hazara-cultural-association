// app/shop/cart/checkout/page.tsx
import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import CheckoutPage from "./ui/CheckoutPage"; // guest (client)
import LoggedInCheckout from "./ui/LoggedInCheckout"; // signed-in (client)

export default async function Page() {
  const { userId } = await requireUser(); // returns { userId } or throws if not logged in

  // If not logged in, show guest flow
  if (!userId) return <CheckoutPage />;

  // Fetch user email (from your `users` table)
  const users = await sql<{ email: string }[]>`
    SELECT email FROM users WHERE id = ${userId} LIMIT 1
  `;
  const email = users[0]?.email ?? "";

  // Fetch profile
  const profiles = await sql<
    {
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
    }[]
  >`
    SELECT first_name, last_name, phone
    FROM user_profiles
    WHERE user_id = ${userId}
    LIMIT 1
  `;
  const profile = profiles[0] ?? {
    first_name: null,
    last_name: null,
    phone: null,
  };

  // Fetch default shipping address (if any)
  const addrs = await sql<
    {
      id: number;
      label: string | null;
      address1: string;
      address2: string | null;
      suburb: string;
      state_code: string;
      postcode: string;
      country: string;
    }[]
  >`
    SELECT id, label, address1, address2, suburb, state_code, postcode, country
    FROM user_addresses
    WHERE user_id = ${userId} AND is_default = true
    LIMIT 1
  `;
  const address = addrs[0] ?? null;

  return (
    <LoggedInCheckout
      userId={userId}
      email={email}
      profile={{
        firstName: profile.first_name ?? "",
        lastName: profile.last_name ?? "",
        phone: profile.phone ?? "",
      }}
      defaultAddress={
        address
          ? {
              id: address.id,
              label: address.label ?? "",
              address1: address.address1,
              address2: address.address2 ?? "",
              suburb: address.suburb,
              stateCode: address.state_code,
              postcode: address.postcode,
              country: address.country,
            }
          : null
      }
    />
  );
}
