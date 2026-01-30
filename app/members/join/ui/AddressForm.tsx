import { AUS_STATES } from "@/app/_lib/helper";
import { Input } from "@/app/ui/global/components";
import { SelectInput } from "@/app/ui/global/SelectInput";
import { ADDRESS_FIELDS as f } from "../../_lib/constant";
import { AddressRow } from "../../_lib/definitions";

import type { JoinState } from "../../_lib/definitions";

type Props = {
  a?: AddressRow;
  errors?: JoinState["errors"];
};

const AddressForm = ({ a, errors }: Props) => {
  return (
    <div className="space-y-3">
      {/* Street address */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          id={f.address1}
          label="Street address"
          placeholder="e.g. 10 Example Street"
          type="text"
          required
          defaultValue={a?.address1 ?? ""}
          error={errors?.address1}
        />
        <Input
          id={f.address2}
          label="Address line 2 (optional)"
          placeholder="Apartment, unit, etc."
          type="text"
          defaultValue={a?.address2 ?? ""}
          error={errors?.address2}
        />
      </div>

      {/* State / suburb / postcode / country */}
      <div className="grid gap-4 md:grid-cols-4">
        <SelectInput
          id={f.stateCode}
          label="State"
          options={AUS_STATES}
          defaultValue={a?.stateCode ?? ""}
          error={errors?.stateCode}
        />

        <Input
          id={f.suburb}
          label="Suburb"
          type="text"
          placeholder="Enter your suburb"
          defaultValue={a?.suburb ?? ""}
          error={errors?.suburb}
        />

        <Input
          id={f.postcode}
          label="Postcode"
          type="text"
          placeholder="e.g. 3175"
          defaultValue={a?.postcode ?? ""}
          error={errors?.postcode}
        />

        <Input
          id={f.country}
          label="Country"
          type="text"
          value={a?.country ?? "AU"}
          readOnly
          error={errors?.country}
        />
      </div>
    </div>
  );
};

export default AddressForm;
