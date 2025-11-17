import type { SessionRole } from "@/app/lib/session";
import Link from "next/link";

type Props = {
  roles: SessionRole[];
};

const RoleBanner = ({ roles }: Props) => {
  const isAdmin = roles.includes("admin");
  const isSeller = roles.includes("seller");
  const isBlogger = roles.includes("blogger");
  const isMember = roles.includes("member");
  const isBasic = roles.includes("basic");

  // Amin sees everything, so all the blocks below render for them.
  const showMarketplaceMsg = isAdmin || isSeller;
  const showBloggerMsg = isAdmin || isBlogger;

  return (
    <div className="space-y-3">
      {showMarketplaceMsg && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span className="font-semibold">Hazara Cultural Association:</span> a
          non-profit marketplace dedicated to preserving Hazaragi heritage.
          Listings must be culturally related and community-respectful.{" "}
          <Link
            href="/shop/guidelines"
            className="underline hover:no-underline"
          >
            Read guidelines
          </Link>
          .
        </div>
      )}

      {showBloggerMsg && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span className="font-semibold">Blog contributors:</span> Articles and
          stories should be respectful, well-sourced, and aligned with HCA’s
          mission.{" "}
          <Link
            href="/blog/guidelines"
            className="underline hover:no-underline"
          >
            Blog guidelines
          </Link>
          .
        </div>
      )}

      {isAdmin && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <span className="font-semibold">Admin notice:</span> You’re seeing all
          role messages. Please review listings and content regularly and help
          keep the marketplace safe and culturally respectful.{" "}
          <Link href="/admin" className="underline hover:no-underline">
            Admin console
          </Link>
          .
        </div>
      )}
    </div>
  );
};

export default RoleBanner;
