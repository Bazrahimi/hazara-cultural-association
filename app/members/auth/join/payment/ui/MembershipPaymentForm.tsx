"use client";
import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { MemberRoutes } from "@/app/_lib/routes";
import { ActionButton, Button, FormErrorMessage, Header, P } from "@/app/_ui";

import { payment } from "../_lib/action";
import {
  PAYMENT_FIELDS as f,
  MEMBERSHIP_OPTIONS,
  PAYMENT_PLANS,
} from "../_lib/constant";

import { useActionState } from "react";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import MembershipOptionCard from "./MembershipOption";

const MembershipPaymentForm = () => {
  const [state, formAction, isPending] = useActionState(payment, undefined);
  return (
    <form action={formAction} className="space-y-8">
      {/* Plan selection */}

      <div className="grid gap-6 md:grid-cols-2">
        {MEMBERSHIP_OPTIONS.map((opt) => (
          <MembershipOptionCard
            key={opt.id}
            opt={opt}
            name={f.plan}
            defaultChecked={opt.id === PAYMENT_PLANS[1]}
          />
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

      <FormErrorMessage message={state?.message} />

      {/* Actions */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Button
          as="link"
          href={MemberRoutes.join()}
          size="lg"
          variant="secondary"
        >
          <TiArrowBack className="mr-2 h-5 w-5" /> Back
        </Button>

        <ActionButton
          type="submit"
          size="lg"
          fullWidth
          isLoading={isPending}
          overlay
          loadingText="Sending..."
        >
          Next <TiArrowForward className="ml-2 h-5 w-5" />
        </ActionButton>
      </div>

      <P size="sm" className="text-gray-500 text-center">
        If you select a paid option, you’ll be redirected to Stripe to complete
        <span className="font-semibold"> payment securely</span> .
      </P>
    </form>
  );
};

export default MembershipPaymentForm;
