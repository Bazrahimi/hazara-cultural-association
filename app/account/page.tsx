import Breadcrumbs, { type Breadcrumb } from "@/app/ui/global/Breadcrumbs";
import { requireUser } from "../lib/session/session";

import QuickActions from "./ui/QuickActions";
import RecentActivity from "./ui/RecentActivity";
import RoleBanner from "./ui/RoleBanner";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Account Dashboard", href: "/account", active: true },
];

export default async function AccountDashboardPage() {
  const { roles, extra } = await requireUser();

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-8">
        {/* Role banner */}
        <RoleBanner roles={roles} fullName={String(extra.fullName)} />

        {/* Quick actions section */}
        <QuickActions />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </>
  );
}
