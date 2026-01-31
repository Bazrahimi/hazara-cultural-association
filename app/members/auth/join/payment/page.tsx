// app/members/join/payment/page.tsx

import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import MembershipPaymentForm from "./ui/MembershipPaymentForm";

// You will create this server action next:
// import { startMembershipPayment } from "./lib/action";

export default function MembershipPaymentPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="space-y-10">
        <div className="space-y-3 text-center">
          <Header as="h1" size="lg" align="center">
            Membership payment
          </Header>
          <P className="mx-auto max-w-3xl text-gray-700">
            Choose your membership option. You can also request a fee waiver if
            cost is a barrier — we want everyone to be able to participate.
          </P>
        </div>

        {/* Payment form */}
        <MembershipPaymentForm />
      </section>
    </main>
  );
}
