import { AUS_STATES } from "@/app/lib/helper";
import { Input } from "@/app/ui/global/components";
import { SelectInput } from "@/app/ui/global/SelectInput";
import type { MemberInput, MemberState } from "../lib/definitions";

type Props = {
  data?: Partial<MemberInput>;
  errors?: MemberState["errors"];
};

const AddressForm = ({ data, errors }: Props) => {
  return (
    <div className="space-y-3">
      {/* Street address */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          id="address1"
          label="Street address"
          placeholder="e.g. 10 Example Street"
          type="text"
          required
          defaultValue={data?.address1}
          error={errors?.address1}
        />
        <Input
          id="address2"
          label="Address line 2 (optional)"
          placeholder="Apartment, unit, etc."
          type="text"
          defaultValue={data?.address2}
          error={errors?.address2}
        />
      </div>

      {/* State / suburb / postcode / country */}
      <div className="grid gap-4 md:grid-cols-4">
        <SelectInput
          id="stateCode"
          label="State"
          options={AUS_STATES}
          defaultValue={data?.stateCode}
          error={errors?.stateCode}
        />

        <Input
          id="suburb"
          label="Suburb"
          type="text"
          placeholder="Enter your suburb"
          defaultValue={data?.suburb}
          error={errors?.suburb}
        />

        <Input
          id="postCode"
          label="Postcode"
          type="text"
          placeholder="e.g. 3175"
          defaultValue={data?.postCode}
          error={errors?.postCode}
        />

        <Input
          id="country"
          label="Country"
          type="text"
          value={data?.country ?? "AU"}
          readOnly
          error={errors?.country}
        />
      </div>
    </div>
  );
};

export default AddressForm;
