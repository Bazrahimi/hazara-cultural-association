import { AUS_STATES } from "@/app/_lib/helper";
import { Input, SelectInput } from "@/app/_ui";
import { ADDRESS_FIELDS as f } from "../../_lib/constant";
import { JoinAddressRow } from "../../_lib/definitions";

import type { JoinState } from "../../_lib/schema";

type Props = {
  initial?: JoinAddressRow;
  state?: JoinState;
};

const AddressForm = ({ initial, state }: Props) => {
  const errors = state?.errors;
  return (
    <div>
      {/* State / suburb / postcode / country */}
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          id={f.suburb}
          label="Suburb"
          type="text"
          placeholder="Enter your suburb"
          defaultValue={state?.data?.suburb ?? initial?.suburb ?? ""}
          error={errors?.suburb}
        />

        <Input
          id={f.postcode}
          label="Postcode"
          type="text"
          placeholder="e.g. 3175"
          defaultValue={state?.data?.postcode ?? initial?.postcode ?? ""}
          error={errors?.postcode}
        />

        <SelectInput
          id={f.stateCode}
          label="State"
          options={AUS_STATES}
          defaultValue={state?.data?.stateCode ?? initial?.stateCode ?? ""}
          error={errors?.stateCode}
        />

        <Input
          id={f.country}
          label="Country"
          type="text"
          value={state?.data?.country ?? initial?.country ?? "AU"}
          readOnly
          error={errors?.country}
        />
      </div>
    </div>
  );
};

export default AddressForm;
