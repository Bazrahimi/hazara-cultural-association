"use client";
import { Input, SelectInput } from "@/app/_ui";
import {
  EDUCATION_LEVEL_OPTIONS,
  PROFILE_FIELDS as f,
} from "../../_lib/constant";
import { ProfileRow } from "../../_lib/definitions";
import type { JoinState } from "../../_lib/schema";

type Props = {
  initial?: ProfileRow;
  state?: JoinState;
};

const PersonalDetailsSection = ({ initial, state }: Props) => {
  const errors = state?.errors;
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
          defaultValue={state?.data?.firstName ?? initial?.firstName ?? ""}
          error={errors?.firstName}
        />
        <Input
          id={f.lastName}
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          defaultValue={state?.data?.lastName ?? initial?.lastName ?? ""}
          error={errors?.lastName}
          required
        />

        <Input
          id={f.phone}
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          defaultValue={state?.data?.phone ?? initial?.phone ?? ""}
          error={errors?.phone}
        />

        <SelectInput
          id={f.educationLevel}
          label="Highest education level (optional)"
          options={EDUCATION_LEVEL_OPTIONS}
          placeholder="Select education level"
          defaultValue={
            state?.data?.educationLevel ?? initial?.educationLevel ?? ""
          }
          error={errors?.educationLevel}
        />

        <Input
          id={f.occupation}
          label="Occupation (optional)"
          type="text"
          placeholder="e.g., student, driver, engineer"
          defaultValue={state?.data?.occupation ?? initial?.occupation ?? ""}
          error={errors?.occupation}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
