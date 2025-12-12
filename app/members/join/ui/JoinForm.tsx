// app/members/join/ui/JoinForm.tsx
"use client";

import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import {
  ActionButton,
  FormErrorMessage,
} from "@/app/ui/global/clientComponent";
import { useActionState } from "react";
import { createMember } from "../lib/action";
import AddressForm from "./AddressForm";
import Involvement from "./Involvement";
import PersonalDetailsSection from "./PersonalDetailsSection";
import type { MemberInput, MemberState } from "../lib/definitions";

type Props = {
  initialData?: Partial<MemberInput>;
};

const JoinForm = ({ initialData }: Props) => {
  const [state, formAction, isPending] = useActionState<
    MemberState,
    FormData
  >(createMember, undefined);

  // Prefer state.data (post-submit), otherwise fall back to initialData
  const mergedData: Partial<MemberInput> = {
    ...initialData,
    ...(state?.data ?? {}),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form
          action={formAction}
          aria-busy={isPending}
          noValidate
          className="space-y-8"
        >
          <PersonalDetailsSection data={mergedData} errors={state?.errors} />

          <AddressForm data={mergedData} errors={state?.errors} />

          <Involvement errors={state?.errors} data={mergedData} />

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
