// app/shop/checkout/cancel/page.tsx
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";

export const metadata = {
  title: "Checkout Cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 sm:p-8">
        <Header as="h2" size="md" align="center" className="mb-2">
          Payment cancelled
        </Header>
        <P className="text-slate-600">
          No charge was made. You can try again any time.
        </P>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/shop/checkout" className="inline-flex">
            <Button>Back to Checkout</Button>
          </Link>
          <Link href="/shop" className="inline-flex">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
