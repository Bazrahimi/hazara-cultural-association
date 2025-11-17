//app/admin/page.tsx
import { Breadcrumb } from "../lib/definitions";
import Breadcrumbs from "../ui/global/Breadcrumbs";
import UserRoleAdminSection from "./users/roles/page";
import QuickEnquiriesPage from "./website-queries/page";

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Admin Dashboard",
    href: "/admin",
    active: true,
  },
];

const page = () => {
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Role Management */}
      <UserRoleAdminSection />

      {/*  */}
      <QuickEnquiriesPage />
    </>
  );
};

export default page;
