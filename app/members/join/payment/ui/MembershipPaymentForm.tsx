"use client";
import StatusBanner from "@/app/ui/global/FormMessage";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { MEMBERSHIP_OPTIONS } from "@/app/members/_lib/constant";
import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { MemberRoutes, PublicRoutes } from "@/app/_lib/routes";
import { ActionButton } from "@/app/ui/global/clientComponent";
import Link from "next/link";
import { useActionState } from "react";
import { payment } from "@/app/members/_lib/action";
import { PAYMENT_FIELDS as f } from "@/app/members/_lib/constant";

const MembershipPaymentForm = () => {
  const [state, formAction, isPending] = useActionState(payment, undefined);
  return (
    <form action={formAction} className="space-y-8">
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
                name={f.plan}
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
            id={f.feeWaived}
            name={f.feeWaived}
            type="checkbox"
            className="mt-1 h-4 w-4"
          />
          <label htmlFor={f.feeWaived} className="text-sm text-gray-800">
            I would like to request a fee waiver
          </label>
        </div>

        <div className="mt-4">
          <label
            htmlFor={f.waiverReason}
            className="block text-sm font-medium text-gray-700"
          >
            Optional note (private)
          </label>
          <textarea
            id={f.waiverReason}
            name={f.waiverReason}
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
          href={MemberRoutes.join()}
          className="text-sm font-medium text-hca-blue-main underline-offset-4 hover:underline"
        >
          ← Back to membership form
        </Link>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <ActionButton type="submit" variant="secondary" size="lg">
            {!isPending && state && (
              <StatusBanner ok={state.ok} message={state.message} />
            )}
            Continue
          </ActionButton>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500">
        If you select a paid option, you’ll be redirected to Stripe to complete
        payment securely.
      </div>
    </form>
  );
};

export default MembershipPaymentForm;
