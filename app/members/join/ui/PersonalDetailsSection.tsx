"use client";

import { Input } from "@/app/ui/global/components";
import { SelectInput } from "@/app/ui/global/SelectInput";
import {
  EDUCATION_LEVEL_OPTIONS,
  PROFILE_FIELDS as f,
} from "../../_lib/constant";
import type { JoinState } from "../../_lib/definitions";
import { ProfileRow } from "../../_lib/definitions";

type Props = {
  p: ProfileRow;
  errors?: JoinState["errors"];
};

const PersonalDetailsSection = ({ p, errors }: Props) => {
  return (
    <div className="space-y-3">
      {/* Name + phone */}
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          id={f.firstName}
          label="First name"
          placeholder="Enter your first name"
          type="text"
          required
          defaultValue={p?.firstName ?? ""}
          error={errors?.firstName}
        />
        <Input
          id={f.lastName}
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          defaultValue={p?.lastName ?? ""}
          error={errors?.lastName}
        />

        <Input
          id={f.phone}
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          defaultValue={p?.phone ?? ""}
          error={errors?.phone}
        />

        <SelectInput
          id={f.educationLevel}
          label="Highest education level (optional)"
          options={EDUCATION_LEVEL_OPTIONS}
          placeholder="Select education level"
          defaultValue={p?.educationLevel ?? ""}
          error={errors?.educationLevel}
        />

        <Input
          id={f.occupation}
          label="Occupation (optional)"
          type="text"
          placeholder="e.g., student, driver, engineer"
          defaultValue={p?.occupation ?? ""}
          error={errors?.occupation}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
