// app/members/join/payment/page.tsx

import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { Button } from "@/app/ui/global/components";
import Link from "next/link";
import { PublicRoutes } from "@/app/_lib/routes";
// You will create this server action next:
// import { startMembershipPayment } from "./lib/action";

const MEMBERSHIP_OPTIONS = [
  {
    id: "monthly",
    label: "Monthly membership",
    priceLabel: "$10 / month",
    helper: "Ongoing membership billed monthly. Cancel any time.",
  },
  {
    id: "annual",
    label: "Annual membership",
    priceLabel: "$115 / year",
    helper: "One payment for 12 months. Best value for regular members.",
  },
] as const;

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
        <form 
        // action={startMembershipPayment} 
        className="space-y-8">
          {/* Plan selection */}
          <div className="grid gap-6 md:grid-cols-2">
            {MEMBERSHIP_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="plan"
                    value={opt.id}
                    defaultChecked={opt.id === "annual"}
                    className="mt-1 h-4 w-4"
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <Header as="h2" size="sm" className="text-gray-900">
                        {opt.label}
                      </Header>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
                        {opt.priceLabel}
                      </span>
                    </div>

                    <P className="text-sm text-gray-700">{opt.helper}</P>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* Fee waiver */}
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm">
            <Header as="h2" size="sm" className="mb-2 text-gray-900">
              Fee waiver
            </Header>

            <P className="text-sm text-gray-700">
              If the membership fee is difficult right now, you can request a
              waiver. We may follow up for confirmation, but we keep this private.
            </P>

            <div className="mt-4 flex items-start gap-3">
              <input
                id="feeWaived"
                name="feeWaived"
                type="checkbox"
                className="mt-1 h-4 w-4"
              />
              <label htmlFor="feeWaived" className="text-sm text-gray-800">
                I would like to request a fee waiver
              </label>
            </div>

            <div className="mt-4">
              <label
                htmlFor="waiverReason"
                className="block text-sm font-medium text-gray-700"
              >
                Optional note (private)
              </label>
              <textarea
                id="waiverReason"
                name="waiverReason"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-1 focus:border-hca-blue-main focus:ring-2 focus:ring-blue-100"
                placeholder="You can share a short note if you want (optional)."
              />
            </div>

            <TermsAndPrivacyNotice
              className="mt-4 text-left text-xs text-gray-500"
              prefix="By continuing, you agree to our"
              size="xs"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Link
              href={PublicRoutes.joinMember()}
              className="text-sm font-medium text-hca-blue-main underline-offset-4 hover:underline"
            >
              ← Back to membership form
            </Link>

            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
              <Button type="submit" variant="secondary" size="lg">
                Continue
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            If you select a paid option, you’ll be redirected to Stripe to
            complete payment securely.
          </div>
        </form>
      </section>
    </main>
  );
}
