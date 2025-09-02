import { Breadcrumb } from "../lib/definitions";
import Breadcrumbs from "../ui/global/Breadcrumbs";

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Home Page",
    href: "/",
  },
  {
    label: "Account Dashboard",
    href: "/account",
    active: true,
  },
];

const page = () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>page</div>
    </>
  );
};

export default page;
