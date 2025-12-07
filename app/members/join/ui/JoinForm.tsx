// app/members/join/page.tsx
"use client";

import { AUS_STATES } from "@/app/lib/helper";
import { Button, Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { SelectInput } from "@/app/ui/global/SelectInput";
import { useActionState } from "react";
import type { AgeRange, ProficiencyLevel } from "../lib/definitions";
import { AGE_RANGES, PROFICIENCY_LEVELS } from "../lib/helper";
import Involvement from "./Involvement";
import { createMember } from "../lib/action";

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
        <form action="" noValidate className="space-y-8">
          {/* Personal Detail */}
          <div className="space-y-4">
            <Header as="h2" size="md">
              Personal details
            </Header>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id="firstName"
                label="First name"
                placeholder="Enter your first name"
                type="text"
                required
              />
              <Input
                id="lastName"
                label="Last name"
                placeholder="Enter your last name"
                type="text"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                id="country"
                label="Country of current residence"
                type="text"
                value="AU"
                // assuming your Input component forwards this
                readOnly
              />

              <SelectInput id="stateCode" label="State" options={AUS_STATES} />

              <Input
                id="postCode"
                label="Post Code"
                type="number"
                placeholder="Enter your your post code"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                id="phone"
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                required
              />
              {/* spacer columns if you want later extra fields */}
              <div className="hidden md:block" />
              <div className="hidden md:block" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SelectInput
              id="ageRange"
              label="Age Range"
              options={AGE_RANGES_OPTION}
              placeholder="Select age range"
            />
            <SelectInput
              id="englishProficiency"
              label="English proficiency"
              options={PROFICIENCY_OPTIONS}
              placeholder="Select Level"
            />
            <SelectInput
              id="farsiHazaragiProficiency"
              label="Farsi / Hazaragi proficiency"
              options={PROFICIENCY_OPTIONS}
              placeholder="Select level"
            />
          </div>

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

            <Involvement />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button>Submit membership</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default JoinForm;
