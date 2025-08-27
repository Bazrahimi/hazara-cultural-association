"use client";
import { Button, Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { CiUser } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { DonationState } from "../../lib/definitions";

type Props = {
  state?: DonationState;
  onBack: () => void;
};

export default function DonationDetails({ state, onBack }: Props) {
  return (
    <fieldset>
      <div className="mb-2  items-center">
        <Button type="button" variant="secondary" fullWidth onClick={onBack}>
          Back
        </Button>
        <Header as="h3" size="sm" align="center" className="m-1">
          Your Details
        </Header>
      </div>

      <Input
        id="fullName"
        label="Full name"
        type="text"
        placeholder="Your full name"
        Icon={CiUser}
        defaultValue={state?.data?.fullName ?? ""}
        error={state?.errors?.fullName}
        inputProps={{ autoComplete: "name" }}
        required
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Your email address"
        Icon={MdEmail}
        defaultValue={state?.data?.email ?? ""}
        error={state?.errors?.email}
        inputProps={{ autoComplete: "email" }}
        required
      />

      <Input
        id="contactNumber"
        label="Contact number"
        type="text"
        placeholder="Enter your contact Number"
        Icon={IoIosPhonePortrait}
        defaultValue={state?.data?.contactNumber ?? ""}
        error={state?.errors?.contactNumber}
        inputProps={{ autoComplete: "tel", inputMode: "tel" }}
      />

      <Input
        id="address1"
        label="Street address"
        type="text"
        placeholder="123 Example St"
        defaultValue={state?.data?.address1 ?? ""}
        error={state?.errors?.address1}
        inputProps={{ autoComplete: "address-line1" }}
        required
      />

      <Input
        id="address2"
        label="Address line 2 (optional)"
        type="text"
        placeholder="Unit, Apartment, etc."
        defaultValue={state?.data?.address2 ?? ""}
        inputProps={{ autoComplete: "address-line2" }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Input
            id="suburb"
            label="Suburb / City"
            type="text"
            placeholder="Your suburb"
            required
            defaultValue={state?.data?.suburb ?? ""}
            error={state?.errors?.suburb}
            inputProps={{ autoComplete: "address-level2" }}
          />
        </div>

        <div>
          <label
            htmlFor="stateCode"
            className="block text-sm font-medium text-gray-700"
          >
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="stateCode"
            name="stateCode"
            defaultValue={state?.data?.stateCode ?? ""}
            className="mt-1 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm sm:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            autoComplete="address-level1"
            required
          >
            <option value="">Select state</option>
            <option value="VIC">Victoria (VIC)</option>
            <option value="NSW">New South Wales (NSW)</option>
            <option value="QLD">Queensland (QLD)</option>
            <option value="SA">South Australia (SA)</option>
            <option value="WA">Western Australia (WA)</option>
            <option value="TAS">Tasmania (TAS)</option>
            <option value="ACT">Australian Capital Territory (ACT)</option>
            <option value="NT">Northern Territory (NT)</option>
          </select>

          {state?.errors?.stateCode?.length ? (
            <p className="mt-2 text-right text-xs text-red-600 sm:text-sm">
              {state.errors.stateCode[0]}
            </p>
          ) : null}
        </div>
      </div>

      <Input
        id="postCode"
        label="PostCode"
        type="text"
        placeholder="Your post-code"
        required
        defaultValue={state?.data?.postCode?.toString?.() ?? ""}
        error={state?.errors?.postCode}
        inputProps={{
          autoComplete: "postal-code",
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 4,
          // label: "postCode", // ensure name matches schema
        }}
      />
    </fieldset>
  );
}
