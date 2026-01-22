// app/shop/ui/shipping-details/AddressFields.tsx
"use client";
import type { FullAddress } from "@/app/(disabled)/_shop/lib/definitions";
import { Input } from "@/app/ui/global/components";

type Props = {
  value: FullAddress;
  onChange: (next: FullAddress) => void;
};

export default function AddressFields({ value, onChange }: Props) {
  const set = (patch: Partial<FullAddress>) => onChange({ ...value, ...patch });

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
          label="State"
          type="text"
          value={value.stateCode || value.state}
          onChange={(v) => set({ stateCode: v, state: v })}
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
    </div>
  );
}
