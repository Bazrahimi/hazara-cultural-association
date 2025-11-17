// app/account/page.tsx
import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import Link from "next/link";
import {
  FaAddressCard,
  FaBoxOpen,
  FaClock,
  FaShoppingBag,
  FaTags,
  FaUserCog,
} from "react-icons/fa";
import { requireUser } from "../lib/session";

import { getUserGreetingName } from "./lib/data";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Account Dashboard", href: "/account", active: true },
];

export default async function AccountDashboardPage() {
  const { userId } = await requireUser();

  const { greetingName } = await getUserGreetingName(userId);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-8">
        {/* Nonprofit mission banner */}
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

        {/* Welcome / hero */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
          <Header as="h1" className="mb-2">
            Welcome back, {greetingName} 👋
          </Header>
          <p className="text-gray-600">
            Help preserve, celebrate, and share Hazaragi culture—through
            community-made textiles, crafts, literature, music, and more.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/account/listing/new"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Start a cultural listing
            </Link>
            <Link
              href="/shop/purchases"
              className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              View purchase history
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              Donate to programs
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Quick Actions */}
          <Card title="Quick actions" subtitle="Jump straight to common tasks">
            <ActionLink
              href="/account/listing/new"
              Icon={FaTags}
              label="Sell a cultural item"
              desc="Create a new listing"
            />
            <ActionLink
              href="/account/listing"
              Icon={FaBoxOpen}
              label="Your listings"
              desc="Manage your items for sale"
            />
            <ActionLink
              href="/account/purchases"
              Icon={FaShoppingBag}
              label="Purchase history"
              desc="View your orders"
            />
          </Card>

          {/* Marketplace Promo (mission-focused) */}
          <PromoCard />

          {/* Account */}
          <Card title="Account" subtitle="Your profile & settings">
            <ActionLink
              href="/account/settings/profile"
              Icon={FaUserCog}
              label="Profile"
              desc="Update your details"
            />
            <ActionLink
              href="/account/settings"
              Icon={FaClock}
              label="Settings"
              desc="Preferences & security"
            />
            <ActionLink
              href="/account/settings/addresses"
              Icon={FaAddressCard}
              label="Addresses"
              desc="Billing & shipping"
            />
          </Card>
        </div>

        {/* Recent Activity (placeholder) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <Link
              href="/shop/purchases"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            You don’t have any recent activity yet. Once you buy or list
            cultural items, they’ll appear here.
          </p>
        </div>
      </div>
    </>
  );
}

/* ---------- Little helpers (in-file components) ---------- */

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ActionLink({
  href,
  Icon,
  label,
  desc,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-lg border border-transparent p-3 hover:border-blue-200 hover:bg-blue-50/40"
    >
      <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200">
        <Icon className="h-4 w-4 text-blue-700" />
      </span>
      <span>
        <span className="block text-sm font-medium text-gray-900 group-hover:text-blue-700">
          {label}
        </span>
        {desc && <span className="block text-xs text-gray-500">{desc}</span>}
      </span>
    </Link>
  );
}

function PromoCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 shadow-sm">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900">
          What belongs on HCA Marketplace?
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Handcrafted Hazara textiles (khamak), clothing & accessories,
          woodwork, calligraphy & visual arts, books & language materials,
          instruments, and archival prints that respectfully represent Hazaragi
          culture.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Unrelated mass-market goods are not permitted.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/shop/guidelines"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Read guidelines
        </Link>
        <Link
          href="/volunteer"
          className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
        >
          Volunteer / Curate
        </Link>
      </div>

      {/* decorative tint */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-indigo-200/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl" />
    </div>
  );
}
