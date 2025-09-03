"use client";
import { Input } from "@/app/ui/global/components";
import type { BillingAddressInput } from "../lib/schema";

type Props = {
  value: BillingAddressInput;
  onChange: (next: BillingAddressInput) => void;
};

const AddressFields = ({ value, onChange }: Props) => {
  const set = (patch: Partial<BillingAddressInput>) =>
    onChange({ ...value, ...patch });
  console.log(value);

  return (
    <div className="mt-4 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="address"
          label="Address"
          type="text"
          value={value.address}
          onChange={(v) => set({ address: v })}
          placeholder="e.g. 12 Smith Street"
          autoComplete="street-address"
          required
        />
        <Input
          id="address2"
          label="Address line 2"
          type="text"
          value={value.address2}
          onChange={(v) => set({ address2: v })}
          placeholder="Unit, Level, Building (optional)"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          id="suburb"
          label="Suburb"
          type="text"
          value={value.suburb}
          onChange={(v) => set({ suburb: v })}
          placeholder="e.g. Dandenong"
          required
        />
        <Input
          id="state"
          label="Australia state"
          type="text"
          value={value.state}
          onChange={(v) => set({ state: v })}
          placeholder="e.g. VIC"
          required
        />
        <Input
          id="postcode"
          label="Postcode"
          type="text"
          value={value.postcode}
          onChange={(v) => set({ postcode: v })}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          placeholder="e.g. 3177"
          required
        />
      </div>
      {value.state}
      {value.country}
    </div>
  );
};

export default AddressFields;
