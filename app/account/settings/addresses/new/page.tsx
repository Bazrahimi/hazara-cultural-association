import { AccountRoutes } from "@/app/_lib/routes";
import Breadcrumbs, { type Breadcrumb } from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import type { BillingAddressInput } from "../lib/schema";
import AddressForm from "../ui/AddressForm";

const initial: BillingAddressInput = {
  address: "",
  address2: "",
  suburb: "",
  state: "",
  postcode: "",
  country: "",
};

const breadcrumbs: Breadcrumb[] = [
  { label: "Dashboard", href: "/account" },
  { label: "Settings", href: AccountRoutes.settings() },
  { label: "Profile", href: AccountRoutes.profile() },
  {
    label: "Add new Addresses",
    href: AccountRoutes.newAddress(),
    active: true,
  },
];

const Page = () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mx-auto max-w-3xl p-2 md:p-8 space-y-6">
        <Header as="h1" className="m-4">
          Add your Primary Address
        </Header>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <AddressForm initial={initial} />
        </div>
      </div>
    </>
  );
};

export default Page;
