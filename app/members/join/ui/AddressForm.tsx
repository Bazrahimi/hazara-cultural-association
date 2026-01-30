import { AUS_STATES } from "@/app/_lib/helper";
import { Input } from "@/app/ui/global/components";
import { SelectInput } from "@/app/ui/global/SelectInput";
import { ADDRESS_FIELDS as f } from "../../_lib/constant";
import { JoinAddressRow } from "../../_lib/definitions";

import type { JoinState } from "../../_lib/definitions";

type Props = {
  a?: JoinAddressRow;
  errors?: JoinState["errors"];
};

const AddressForm = ({ a, errors }: Props) => {
  return (
    <div>
      {/* State / suburb / postcode / country */}
      <div className="grid gap-4 md:grid-cols-3">
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

        <SelectInput
          id={f.stateCode}
          label="State"
          options={AUS_STATES}
          defaultValue={a?.stateCode ?? ""}
          error={errors?.stateCode}
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
