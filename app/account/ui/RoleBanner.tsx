import { AdminRoutes, DonateRoutes, PublicRoutes } from "@/app/lib/routes";
import type { SessionRole } from "@/app/lib/session";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";

type Props = {
  roles: SessionRole[];
  fullName: string;
};

const RoleBanner = ({ roles, fullName }: Props) => {
  const isAdmin = roles.includes("admin");
  const isSeller = roles.includes("seller");
  const isBlogger = roles.includes("blogger");
  // const isMember = roles.includes("member");
  // const isBasic = roles.includes("basic");

  // Amin sees everything, so all the blocks below render for them.
  const showMarketplaceMsg = isAdmin || isSeller;
  const showBloggerMsg = isAdmin || isBlogger;

  return (
    <>
      <div className="space-y-3">
        {showMarketplaceMsg && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <P>
              {" "}
              <span className="font-semibold">
                Hazara Cultural Association:
              </span>{" "}
              a non-profit marketplace dedicated to preserving Hazaragi
              heritage. Listings must be culturally related and
              community-respectful.{" "}
            </P>
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
            <P>
              <span className="font-semibold">Blog contributors:</span> Articles
              and stories should be respectful, well-sourced, and aligned with
              HCA’s mission.{" "}
            </P>
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
            <P>
              <span className="font-semibold">Admin notice:</span> You’re seeing
              all role messages. Please review listings and content regularly
              and help keep the marketplace safe and culturally respectful.{" "}
            </P>
            <Link
              href={AdminRoutes.root()}
              className="underline hover:no-underline"
            >
              Admin console
            </Link>
            .
          </div>
        )}
      </div>

      {/* Welcome / hero */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
        <Header as="h1" className="mb-2">
          Welcome back, {fullName} 👋
        </Header>

        <P className="mt-10">
          <span className="font-semibold">Membership</span> at HCA opens the
          door to meaningful participation—joining meetings, sharing your ideas,
          and helping guide important community initiatives. Our{" "}
          <span className="font-semibold">Marketplace</span> celebrates Hazara
          culture by supporting local creators and heritage craftsmanship.{" "}
          <span className="font-semibold">Bloggers</span> amplify our collective
          voice by covering news, events, and human-rights stories that uplift
          and empower our community. You can also make a difference as a{" "}
          <span className="font-semibold">donor</span> and contribute directly
          to community programs.
        </P>

        {/* Call-to-action text */}
        <P size="sm" className="mt-6 font-medium text-gray-700">
          Explore your opportunities to make a difference:
        </P>

        <div className="mt-3 flex flex-wrap gap-3">
          <Button
            as="link"
            href={PublicRoutes.joinMember()}
            variant="outline"
            size="sm"
          >
            Membership
          </Button>

          <Button as="link" href="/shop/join" variant="outline" size="sm">
            Marketplace Seller
          </Button>

          <Button as="link" href="/blog/join" variant="outline" size="sm">
            Blogger
          </Button>

          <Button
            as="link"
            href={DonateRoutes.root()}
            variant="outline"
            size="sm"
          >
            Donate
          </Button>
        </div>
      </div>
    </>
  );
};

export default RoleBanner;
