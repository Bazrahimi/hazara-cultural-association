import { requireUser } from "@/app/lib/session";
import { sql } from "@/app/lib/db";
import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import { Profile } from "./lib/schema";
import ProfileForm from "./ui/ProfileForm";
import { AccountRoutes } from "@/app/lib/routes";


const breadcrumbs: Breadcrumb[] = [
  {
    label: "Dashboard",
    href: "/account",
  },
  {
    label: "Settings",
    href: AccountRoutes.settings(),
  },
  {
    label: "Profile",
    href: AccountRoutes.profile(),
    active: true,
  },
];

export default async function ProfileFullPage() {
  const { userId } = await requireUser();

  const rows = await sql<Profile[]>`
    SELECT 
      first_name AS "firstName", 
      last_name AS "lastName", 
      phone AS "contactNumber"
    FROM 
      user_profiles
    WHERE 
      user_id = ${userId}
    LIMIT 1
  `;

  const initial: Partial<Profile> = {
    firstName: rows[0]?.firstName ?? "",
    lastName: rows[0]?.lastName ?? "",
    contactNumber: rows[0]?.contactNumber ?? "",
  };

  return (
    <>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mx-auto max-w-3xl p-6 md:p-8 space-y-6">
        <Header as="h1">Set Up Profile</Header>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <ProfileForm initial={initial} />
        </div>
      </div>
    </>
  );
}
