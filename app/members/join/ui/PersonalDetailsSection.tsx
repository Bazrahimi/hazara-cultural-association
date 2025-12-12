"use client";

import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { SelectInput } from "@/app/ui/global/SelectInput";
import type {
  AgeRange,
  MemberInput,
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
  data?: Partial<MemberInput>;
  errors?: MemberState["errors"];
};

const PersonalDetailsSection = ({ data, errors }: Props) => {
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
          defaultValue={data?.firstName}
          error={errors?.firstName}
        />
        <Input
          id="lastName"
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          defaultValue={data?.lastName}
          error={errors?.lastName}
        />

        <Input
          id="phone"
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          defaultValue={data?.phone}
          error={errors?.phone}
        />
      </div>

      {/* Age + proficiency */}
      <div className="grid gap-4 md:grid-cols-3">
        <SelectInput
          id="ageRange"
          label="Age Range"
          options={AGE_RANGES_OPTION}
          placeholder="Select age range"
          defaultValue={data?.ageRange}
          error={errors?.ageRange}
        />
        <SelectInput
          id="englishProficiency"
          label="English proficiency"
          options={PROFICIENCY_OPTIONS}
          placeholder="Select level"
          defaultValue={data?.englishProficiency}
          error={errors?.englishProficiency}
        />
        <SelectInput
          id="farsiHazaragiProficiency"
          label="Farsi / Hazaragi proficiency"
          options={PROFICIENCY_OPTIONS}
          placeholder="Select level"
          defaultValue={data?.farsiHazaragiProficiency}
          error={errors?.farsiHazaragiProficiency}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
