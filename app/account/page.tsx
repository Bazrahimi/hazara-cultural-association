import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { requireUser } from "../lib/session";
import { getUserGreetingName } from "./lib/data";
import RoleBanner from "./ui/RoleBanner";
import RecentActivity from "./ui/RecentActivity";
import QuickActions from "./ui/QuickActions";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Account Dashboard", href: "/account", active: true },
];

export default async function AccountDashboardPage() {
  const { userId, roles } = await requireUser();
  const { greetingName } = await getUserGreetingName(userId);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-8">
        {/* Role banner */}
        <RoleBanner roles={roles} greetingName={greetingName} />

        {/* Quick actions section */}
        <QuickActions roles={roles} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </>
  );
}
