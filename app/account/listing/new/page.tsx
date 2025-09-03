//app/account/listing/new/page.tsx
import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import NewListingForm from "./ui/new-listing-form";
import { requireUser } from "@/app/lib/auth";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Account Dashboard", href: "/account" },
  { label: "listed Products", href: "/account/listing" },
  { label: "New listing", href: "/account/listing/new", active: true },
];

const page = async() => {
  const {userId} = await requireUser()
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mx-auto space-y-8 p-6 md:p-8">
        <Header as="h1" className="mb-2">
          Create a new Cultural Listing
        </Header>
        <P className="text-gray-700">
          Please only list items that preserve, celebrate, or share Hazara
          cultural heritage (e.g., textiles, crafts, calligraphy, literature,
          instruments).
        </P>
        <NewListingForm userId={userId} />
      </div>
    </>
  );
};

export default page;
