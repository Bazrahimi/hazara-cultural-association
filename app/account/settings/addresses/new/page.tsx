import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import { BillingAddressInput } from "../lib/schema";
import AddressForm from "../ui/AddressForm";

const initial:BillingAddressInput = {
  address: "",
  suburb: "",
  state: "",
  postcode: "",
  country: "",
  address2: "",
};

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Dashboard",
    href: "/account",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
  {
    label: "Profile",
    href: "/account/settings/profile",
  },
  {
    label: "Add new Addresses",
    href: "/account/settings/addresses/new",
    active: true,
  },
];



const page = () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mx-auto max-w-3xl p-2 md:p-8 space-y-6">
        <Header as="h1" className="m-4">Add your Primary Address</Header>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <AddressForm initial = {initial} />
        </div>
      </div>
    </>
  );
};

export default page;
