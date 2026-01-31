// app/members/join/ui/JoinForm.tsx
"use client";

import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import {
  ActionButton,
  FormErrorMessage,
} from "@/app/ui/global/clientComponent";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { useActionState } from "react";
import { join } from "../../_lib/action";
import { JoinAddressRow, ProfileRow } from "../../_lib/definitions";
import AddressForm from "./AddressForm";
import Involvement from "./Involvement";
import PersonalDetailsSection from "./PersonalDetailsSection";

type Props = {
  profile: ProfileRow;
  address: JoinAddressRow;
};

const JoinForm = ({ profile, address }: Props) => {
  const [state, formAction, isPending] = useActionState(
    join,
    undefined,
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <Header as="h1" size="md" align="center">
          Membership Form
        </Header>
        <P>
          Please complete the form below with accurate details. This information
          helps us verify your membership and keep the community connected.
        </P>
        <form
          action={formAction}
          aria-busy={isPending}
          noValidate
          className="space-y-8"
        >
          <PersonalDetailsSection initial={profile} state={state} />

          <AddressForm initial={address} state={state} />

          <Involvement state={state} initial={profile} />

          <FormErrorMessage message={state?.message} />

          {/* TOS + Privacy */}
          <TermsAndPrivacyNotice
            className="mt-2"
            prefix="By submitting this membership form, you agree to our"
            size="xs"
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
