"use client";

import { Input } from "@/app/_ui";
import type { BillingAddressInput } from "../lib/schema";
import { FieldErrors } from "@/app/_lib/actionHelper";

type Props = {
  value: BillingAddressInput;
  onChange: (next: BillingAddressInput) => void;
  errors?: FieldErrors<BillingAddressInput>;
};

const AddressFields = ({ value, onChange, errors }: Props) => {
  const set = (patch: Partial<BillingAddressInput>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <Input
          id="address"
          label="Street address"
          type="text"
          value={value.address}
          onChange={(v) => set({ address: v })}
          placeholder="e.g. 12 Smith Street"
          required
          error={errors?.address}
        />

        <Input
          id="address2"
          label="Address line 2"
          type="text"
          value={value.address2 ?? ""} // keep controlled
          onChange={(v) => set({ address2: v })}
          placeholder="Unit, Level, Building (optional)"
          error={errors?.address2}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <Input
          id="suburb"
          label="Suburb"
          type="text"
          value={value.suburb}
          onChange={(v) => set({ suburb: v })}
          placeholder="e.g. Dandenong"
          required
          error={errors?.suburb}
        />

        <Input
          id="state"
          label="Your State"
          type="text"
          value={value.state}
          onChange={(v) => set({ state: v })}
          placeholder="e.g. VIC"
          required
          error={errors?.state}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <Input
          id="postcode"
          label="Postcode"
          type="text"
          value={value.postcode}
          onChange={(v) => set({ postcode: v })}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          placeholder="e.g. 3177"
          required
          error={errors?.postcode}
        />

        <Input
          id="country"
          label="Country"
          type="text"
          value={value.country}
          onChange={(v) => set({ country: v })}
          placeholder="AU"
          required
          error={errors?.country}
        />
      </div>
    </div>
  );
};

export default AddressFields;
