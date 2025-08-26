"use client";
import { Button, Input, InputAutocomplete } from "@/app/ui/global/components";
import { DonationState } from "../../lib/definitions";

export type AUState =
  | "VIC"
  | "NSW"
  | "QLD"
  | "SA"
  | "WA"
  | "TAS"
  | "ACT"
  | "NT";

// Server returns errors keyed by DonationSchema:
// amount, fullName, email, contactNumber, address, suburb, state, postCode, creditCard
type ServerErrors = Partial<
  Record<
    | "amount"
    | "fullName"
    | "email"
    | "contactNumber"
    | "address"
    | "suburb"
    | "state"
    | "postCode"
    | "creditCard",
    string[]
  >
>;

type Props = {
  state: DonationState | undefined;

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
        placeholder="Enter your full name"
        defaultValue={state?.data?.fullName}
        error={state?.errors?.fullName}
        required
      />

      <Input
        id="email"
        label="Email Address"
        placeholder="Enter your email Address"
        type="email"
        defaultValue={state?.data?.email}
        error={state?.errors?.email}
        required
      />

      <Input
        id="contactNumber"
        label="Contact number"
        type="text"
        placeholder="Enter your contact number"
        defaultValue={state?.data?.contactNumber}
        error={state?.errors?.contactNumber}
      />

      {/* Address line 1 */}
      <Input
        id="address1"
        label="Street address"
        type="text"
        placeholder="123 Example St"
        defaultValue={state?.data?.address1}
        error={state?.errors?.address1}
      />

      {/* Address line 2 (optional) */}
      <Input
        id="address2"
        label="Address line 2 (optional)"
        type="text"
        placeholder="Unit, Apartment, etc."
        defaultValue={state?.data?.address2}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Suburb / City */}
        <div className="sm:col-span-2">
          <Input
            id="suburb"
            label="Suburb"
            type="text"
            placeholder="Enter your suburb"
            defaultValue={state?.data?.suburb}
            error={state?.errors?.suburb}
          />
        </div>

        <div>
          <InputAutocomplete
            id="state"
            label="state" // matches server schema
            defaultValue={state?.data?.state}
            error={state?.errors?.state}
            options={["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"]}
          />
        </div>
      </div>

      {/* Postcode (server: postCode) */}
      <Input
        id="postCode"
        label="Postcode"
        type="number"
        placeholder="your post code"
        defaultValue={state?.data?.postCode}
        error={state?.errors?.postCode}
      />
    </fieldset>
  );
}
