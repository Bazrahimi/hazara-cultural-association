"use client";

import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { SelectInput } from "@/app/ui/global/SelectInput";
import type {
  AgeRange,
  MemberState,
  ProficiencyLevel,
} from "../lib/definitions";
import { AGE_RANGES, PROFICIENCY_LEVELS } from "../lib/helper";

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

type Props = {
  state?: MemberState;
};

const PersonalDetailsSection = ({ state }: Props) => {
  return (
    <div className="space-y-3">
      <Header as="h2" size="md" align="center">
        Personal details
      </Header>

      {/* Name + phone */}
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

      {/* Age + proficiency */}
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
          placeholder="Select level"
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
    </div>
  );
};

export default PersonalDetailsSection;
