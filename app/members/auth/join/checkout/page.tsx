// app/members/join/checkout/page.tsx

import { Header, P } from "@/app/_ui";
import MembershipCheckoutForm from "./ui/MembershipCheckoutForm";

export default function MembershipCheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="space-y-10">
        <div className="space-y-3 text-center">
          <Header as="h1" size="lg" align="center">
            Membership payment
          </Header>
          <P className="mx-auto max-w-3xl text-gray-700 mt-5 md:mt-10">
            Choose your membership option. You can also request a fee waiver if
            cost is a barrier — we want everyone to be able to participate.
          </P>
        </div>

        {/* Payment form */}
        <MembershipCheckoutForm />
      </section>
    </main>
  );
}
