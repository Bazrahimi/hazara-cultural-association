// app/donate/cancel/page.tsx
import { DonateRoutes } from "@/app/_lib/routes";
import { Button, Header } from "@/app/_ui";
import Link from "next/link";

export const metadata = {
  title: "Donation Cancelled",
};

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 sm:p-8">
        <Header as="h2" size="md" align="center" className="mb-4">
          Donation cancelled
        </Header>
        <p className="text-center text-slate-600">
          No charge was made. You can try again any time.
        </p>

        <div className="mt-6 flex justify-center">
          <Link href={DonateRoutes.root()}>
            <Button>Back to Donate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
