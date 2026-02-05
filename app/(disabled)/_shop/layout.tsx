// app/shop/layout.tsx
import { ORG_PROFILE } from "@/app/_lib/org/profile";
import { decrypt } from "@/app/_lib/session/session";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CartProvider } from "./ui/cart/CartContext";

export const metadata: Metadata = {
  title: `Shop | ${ORG_PROFILE.orgName}`,
  description: `Support the ${ORG_PROFILE.orgName} by purchasing cultural items, flags, books, and memorabilia. Proceeds fund advocacy and community programs.`,
};

const ShopLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  return (
    <CartProvider userId={Number(session?.userId)}>
      <>{children}</>
    </CartProvider>
  );
};

export default ShopLayout;
