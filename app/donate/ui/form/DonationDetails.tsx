"use client";
import { Button, Input } from "@/app/ui/global/components";
import { DonationState } from "../../lib/definitions";

type Props = {
  state?: DonationState;
  onBack: () => void;
};

export default function DonationDetails({ state, onBack }: Props) {
  return (
    <fieldset>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Your details</h3>
        <Button type="button" variant="secondary" size="sm" onClick={onBack}>
          Back
        </Button>
      </div>

      <Input
        id="fullName"
        label="Full name"
        type="text"
        placeholder="Jane Citizen"
        defaultValue={state?.data?.fullName ?? ""}
        error={state?.errors?.fullName}
        inputProps={{ autoComplete: "name" }}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        defaultValue={state?.data?.email ?? ""}
        error={state?.errors?.email}
        inputProps={{ autoComplete: "email" }}
      />

      <Input
        id="contactNumber"
        label="Contact number"
        type="text"
        placeholder="04xx xxx xxx"
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
        error={state?.errors?.address}
        inputProps={{ autoComplete: "address-line1" }}
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
            placeholder="Dandenong"
            defaultValue={state?.data?.suburb ?? ""}
            error={state?.errors?.suburb}
            inputProps={{ autoComplete: "address-level2" }}
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            defaultValue={state?.data?.state ?? ""}
            className="mt-1 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm sm:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            autoComplete="address-level1"
          >
            <option value="">Select state</option>
            <option value="VIC">VIC</option>
            <option value="NSW">NSW</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="WA">WA</option>
            <option value="TAS">TAS</option>
            <option value="ACT">ACT</option>
            <option value="NT">NT</option>
          </select>
          {state?.errors?.state?.length ? (
            <p className="mt-2 text-right text-xs text-red-600 sm:text-sm">
              {state.errors.state[0]}
            </p>
          ) : null}
        </div>
      </div>

      <Input
        id="postCode"
        label="Postcode"
        type="text"
        placeholder="3175"
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
