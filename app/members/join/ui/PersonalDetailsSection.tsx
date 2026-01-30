"use client";

import { Input } from "@/app/ui/global/components";
import { SelectInput } from "@/app/ui/global/SelectInput";
import type {

  MemberInput,
  MemberState,

} from "../lib/definitions";






type Props = {
  data?: Partial<MemberInput>;
  errors?: MemberState["errors"];
};

const PersonalDetailsSection = ({ data, errors }: Props) => {
  return (
    <div className="space-y-3">
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

 
    </div>
  );
};

export default PersonalDetailsSection;
