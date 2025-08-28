import { Breadcrumb } from "../lib/definitions";
import { destroySession } from "../lib/session";
import Breadcrumbs from "../ui/global/Breadcrumbs";
import { Button } from "../ui/global/components";
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
        <form action={destroySession}>
          <Button>Logout</Button>
        </form>
      </div>

      {/*  */}
      <QuickEnquiriesPage />
    </>
  );
};

export default page;
