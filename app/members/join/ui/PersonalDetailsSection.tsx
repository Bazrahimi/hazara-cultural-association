"use client";

import { Input } from "@/app/ui/global/components";
import { PROFILE_FIELDS as f } from "../../_lib/constant";
import { ProfileRow } from "../../_lib/definitions";
import type { MemberState } from "../lib/definitions";

type Props = {
  p: ProfileRow;
  errors?: MemberState["errors"];
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
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
