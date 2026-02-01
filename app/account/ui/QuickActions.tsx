"use client";

import { AccountRoutes, BlogRoutes, DonateRoutes } from "@/app/_lib/routes";
import { Header } from "@/app/_ui";
import {
  FaAddressCard,
  FaBoxOpen,
  FaClock,
  FaHandHoldingHeart,
  FaLock,
  FaPenFancy,
  FaRegNewspaper,
  FaShoppingBag,
  FaTags,
  FaUserCog,
  FaUserPlus,
} from "react-icons/fa";
import { DashboardActionLink, DashboardCard } from "./DashboardCard";

// type Props = {
//   roles?: string[];
// };

export default function QuickActions() {
  // { roles }: Props
  return (
    <>
      <Header as="h2" className="mt-8 mb-4">
        Quick Actions
      </Header>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Seller */}
        <DashboardCard
          title="Seller actions"
          subtitle="Create and manage your marketplace listings"
        >
          <DashboardActionLink
            href={AccountRoutes.newListing()}
            Icon={FaTags}
            label="Sell a cultural item"
            desc="Create a new marketplace listing"
          />
          <DashboardActionLink
            href="/account/listing"
            Icon={FaBoxOpen}
            label="Your listings"
            desc="Manage your active and draft items"
          />
          <DashboardActionLink
            href="/account/sold"
            Icon={FaShoppingBag}
            label="Sales history"
            desc="View items you’ve sold"
          />
        </DashboardCard>

        {/* Blog */}
        <DashboardCard
          title="Blog actions"
          subtitle="Write and manage your posts"
        >
          <DashboardActionLink
            href={BlogRoutes.new()}
            Icon={FaPenFancy}
            label="Create new post"
            desc="Write a news, event, or announcement"
          />
          <DashboardActionLink
            href={BlogRoutes.manageMyPosts()}
            Icon={FaRegNewspaper}
            label="My posts"
            desc="View, edit, publish, or archive your posts"
          />
        </DashboardCard>

        {/* Community & Membership */}
        <DashboardCard
          title="Community & membership"
          subtitle="Stay involved with HCA"
        >
          <DashboardActionLink
            href="/membership"
            Icon={FaAddressCard}
            label="Membership status"
            desc="View or renew your membership"
          />
          <DashboardActionLink
            href="/membership/join"
            Icon={FaUserPlus}
            label="Join HCA"
            desc="Become a member of the association"
          />
          <DashboardActionLink
            href={DonateRoutes.root()}
            Icon={FaHandHoldingHeart}
            label="Donate"
            desc="Support community programs"
          />
        </DashboardCard>

        {/* Account */}
        <DashboardCard
          title="Account & settings"
          subtitle="Your profile and preferences"
        >
          <DashboardActionLink
            href={AccountRoutes.profile()}
            Icon={FaUserCog}
            label="Profile"
            desc="Update your personal details"
          />
          <DashboardActionLink
            href={AccountRoutes.changePassword()}
            Icon={FaLock}
            label="Change password"
            desc="Update your login password"
          />
          <DashboardActionLink
            href={AccountRoutes.settings()}
            Icon={FaClock}
            label="Settings"
            desc="Manage preferences and security"
          />
          <DashboardActionLink
            href={AccountRoutes.addresses()}
            Icon={FaAddressCard}
            label="Addresses"
            desc="Manage billing and shipping details"
          />
        </DashboardCard>
      </div>
    </>
  );
}
