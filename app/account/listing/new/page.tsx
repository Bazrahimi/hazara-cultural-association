//app/account/listing/new/page.tsx
import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import NewListingForm from "./ui/new-listing-form";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "Account Dashboard", href: "/account" },
  { label: "listed Products", href: "/account/listing" },
  { label: "New listing", href: "/account/listing/new", active: true },
];

const page = async () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-lg p-5 sm:p-7 md:p-8">
          <Header as="h1" className="mb-2">
            Create a new Cultural Listing
          </Header>
          <P className="text-gray-700 mb-10">
            Please only list items that preserve, celebrate, or share Hazara
            cultural heritage (e.g., textiles, crafts, calligraphy, literature,
            instruments).
          </P>
          <NewListingForm />
        </div>
      </div>
    </>
  );
};

export default page;
