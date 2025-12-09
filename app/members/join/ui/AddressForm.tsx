import { AUS_STATES } from "@/app/lib/helper";
import { Input } from "@/app/ui/global/components";
import { SelectInput } from "@/app/ui/global/SelectInput";
import { MemberState } from "../lib/definitions";

type Props = {
  state: MemberState | undefined;
};

const AddressForm = ({ state }: Props) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          id="address1"
          label="Street address"
          placeholder="e.g. 10 Example Street"
          type="text"
          required
          defaultValue={state?.data?.address1}
          error={state?.errors?.address1}
        />
        <Input
          id="address2"
          label="Address line 2 (optional)"
          placeholder="Apartment, unit, etc."
          type="text"
          defaultValue={state?.data?.address2}
          error={state?.errors?.address2}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SelectInput
          id="stateCode"
          label="State"
          options={AUS_STATES}
          error={state?.errors?.stateCode}
          defaultValue={state?.data?.stateCode}
        />

        <Input
          id="suburb"
          label="Suburb"
          type="text"
          placeholder="Enter your suburb"
          defaultValue={state?.data?.suburb}
          error={state?.errors?.suburb}
        />

        <Input
          id="country"
          label="Country of current residence"
          type="text"
          value="AU"
          readOnly
          error={state?.errors?.country}
        />
      </div>
    </>
  );
};

export default AddressForm;
