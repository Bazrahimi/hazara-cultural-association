// app/members/join/page.tsx
"use client";

import {
  ActionButton,
  FormErrorMessage,
} from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { SelectInput } from "@/app/ui/global/SelectInput";
import { useActionState } from "react";
import { createMember } from "../lib/action";
import type { AgeRange, ProficiencyLevel } from "../lib/definitions";
import { AGE_RANGES, PROFICIENCY_LEVELS } from "../lib/helper";
import AddressForm from "./AddressForm";
import Involvement from "./Involvement";

const PROFICIENCY_OPTIONS = (
  Object.entries(PROFICIENCY_LEVELS) as [string, string][]
).map(([value, label]) => ({
  value: Number(value) as ProficiencyLevel,
  label,
}));

const AGE_RANGES_OPTION = (
  Object.entries(AGE_RANGES) as [string, string][]
).map(([value, label]) => ({
  value: Number(value) as AgeRange,
  label,
}));

const JoinForm = () => {
  const [state, formAction, isPending] = useActionState(
    createMember,
    undefined
  );
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <form
          action={formAction}
          aria-busy={isPending}
          noValidate
          className="space-y-8"
        >
          {/* Personal Detail */}
          <div className="space-y-4">
            <Header as="h2" size="md">
              Personal details
            </Header>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                id="firstName"
                label="First name"
                placeholder="Enter your first name"
                type="text"
                required
                defaultValue={state?.data?.firstName}
                error={state?.errors?.firstName}
              />
              <Input
                id="lastName"
                label="Last name"
                placeholder="Enter your last name"
                type="text"
                defaultValue={state?.data?.lastName}
                error={state?.errors?.lastName}
              />

              <Input
                id="phone"
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                defaultValue={state?.data?.phone}
                error={state?.errors?.phone}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SelectInput
              id="ageRange"
              label="Age Range"
              options={AGE_RANGES_OPTION}
              placeholder="Select age range"
              defaultValue={state?.data?.ageRange}
              error={state?.errors?.ageRange}
            />
            <SelectInput
              id="englishProficiency"
              label="English proficiency"
              options={PROFICIENCY_OPTIONS}
              placeholder="Select Level"
              defaultValue={state?.data?.englishProficiency}
              error={state?.errors?.englishProficiency}
            />
            <SelectInput
              id="farsiHazaragiProficiency"
              label="Farsi / Hazaragi proficiency"
              options={PROFICIENCY_OPTIONS}
              placeholder="Select level"
              defaultValue={state?.data?.farsiHazaragiProficiency}
              error={state?.errors?.farsiHazaragiProficiency}
            />
          </div>

          <AddressForm state={state} />

          {/* Involvement & online presence */}
          <div className="space-y-3">
            <Header as="h2" size="md">
              How would you like to be involved?
            </Header>

            <p className="text-sm text-gray-700">
              HCA has a blog and a modern online marketplace to share news,
              amplify the voices of those who are often silenced, and help the
              community find culturally relevant services, products, and
              stories.
            </p>

            <Involvement errors={state?.errors} data={state?.data} />
          </div>

          <FormErrorMessage message={state?.message} />

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
      </section>
    </main>
  );
};

export default JoinForm;
