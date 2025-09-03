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
      <div className="gap-2 md:gap-4 grid grid-cols-2">
        <Input
          id="address"
          label="Address"
          type="text"
          value={value.address}
          onChange={(v) => set({ address: v })}
          placeholder="e.g. 12 Smith Street"
          // autoComplete="street-address"
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

      <div className="gap-2 md:gap-4 grid grid-cols-2">
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
          label="Your State"
          type="text"
          value={value.state}
          onChange={(v) => set({ state: v })}
          placeholder="e.g. VIC"
          required
        />
      </div>

      <div className="gap-2 md:gap-4 grid grid-cols-2">
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

        <Input
          id="country"
          label="country"
          type="text"
          value={value.country}
          onChange={(v) => set({ country: v })}
          placeholder="Australia"
          required
        />
      </div>
    </div>
  );
};

export default AddressFields;
