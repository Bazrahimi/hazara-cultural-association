// app/members/join/page.tsx
"use client";

import {
  ActionButton,
  FormErrorMessage,
} from "@/app/ui/global/clientComponent";
import { useActionState } from "react";
import { createMember } from "../lib/action";
import AddressForm from "./AddressForm";
import Involvement from "./Involvement";
import PersonalDetailsSection from "./PersonalDetailsSection";
import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";

const JoinForm = () => {
  const [state, formAction, isPending] = useActionState(
    createMember,
    undefined
  );
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form
          action={formAction}
          aria-busy={isPending}
          noValidate
          className="space-y-8"
        >
          <PersonalDetailsSection state={state} />

          <AddressForm state={state} />

          <Involvement errors={state?.errors} data={state?.data} />

          <FormErrorMessage message={state?.message} />

                {/* TOS + Privacy */}
          <TermsAndPrivacyNotice
            className="mt-2"
            prefix="By submitting this membership form, you agree to our"
          />

          {/* Submit */}
          <div className="flex justify-end">
            <ActionButton
              type="submit"
              fullWidth
              isLoading={isPending}
              overlay
              loadingText="Submitting..."
            >
              Submit membership
            </ActionButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JoinForm;
