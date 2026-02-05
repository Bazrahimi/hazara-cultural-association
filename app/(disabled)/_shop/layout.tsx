// app/shop/layout.tsx
import { ORG_PROFILE } from "@/app/_lib/org/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shop | ${ORG_PROFILE.orgName}`,
  description: `Support the ${ORG_PROFILE.orgName} by purchasing cultural items, flags, books, and memorabilia. Proceeds fund advocacy and community programs.`,
};

const ShopLayout = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ShopLayout;
