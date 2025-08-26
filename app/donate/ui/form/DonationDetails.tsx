"use client";
import { Button, Input } from "@/app/ui/global/components";

export type AUState =
  | "VIC"
  | "NSW"
  | "QLD"
  | "SA"
  | "WA"
  | "TAS"
  | "ACT"
  | "NT";

type Details = {
  fullName: string;
  email: string;
  contactNumber: string;

  // Split address (these are visual-only; parent will combine into hidden "address")
  address1: string;
  address2: string;

  suburb: string;
  state: "" | AUState;
  postCode: string;

  // UI toggle; submitted as checkbox with name="creditCard"
  payByCard: boolean;
};

type Props = {
  details: Details;
  onChange: <K extends keyof Details>(field: K, value: Details[K]) => void;
  onBack: () => void;
};

export default function DonationDetails({ details, onChange, onBack }: Props) {
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
        value={details.fullName}
        onChange={(v) => onChange("fullName", v)}
        inputProps={{ autoComplete: "name" }}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={details.email}
        onChange={(v) => onChange("email", v)}
        inputProps={{ autoComplete: "email" }}
      />

      <Input
        id="contactNumber"
        label="Contact number"
        type="text"
        placeholder="04xx xxx xxx"
        value={details.contactNumber}
        onChange={(v) => onChange("contactNumber", v)}
        inputProps={{ autoComplete: "tel", inputMode: "tel" }}
      />

      {/* Address line 1 */}
      <Input
        id="address1"
        label="Street address"
        type="text"
        placeholder="123 Example St"
        value={details.address1}
        onChange={(v) => onChange("address1", v)}
        inputProps={{ autoComplete: "address-line1" }}
      />

      {/* Address line 2 (optional) */}
      <Input
        id="address2"
        label="Address line 2 (optional)"
        type="text"
        placeholder="Unit, Apartment, etc."
        value={details.address2}
        onChange={(v) => onChange("address2", v)}
        inputProps={{ autoComplete: "address-line2" }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Suburb / City */}
        <div className="sm:col-span-2">
          <Input
            id="suburb"
            label="Suburb / City"
            type="text"
            placeholder="Dandenong"
            value={details.suburb}
            onChange={(v) => onChange("suburb", v)}
            inputProps={{ autoComplete: "address-level2" }}
          />
        </div>

        {/* State (AU) */}
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            name="state" // <-- matches server schema
            value={details.state}
            onChange={(e) =>
              onChange("state", e.currentTarget.value as Details["state"])
            }
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
        </div>
      </div>

      {/* Postcode (note id/name casing to match server: postCode) */}
      <Input
        id="postCode"
        label="Postcode"
        type="text"
        placeholder="3175"
        value={details.postCode}
        onChange={(v) => onChange("postCode", v)}
        inputProps={{
          autoComplete: "postal-code",
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 4,
        }}
      />

      <label className="mb-5 mt-2 flex items-center gap-2 text-sm text-gray-700">
        <input
          id="creditCard"
          name="creditCard" // <-- this ensures FormData has "creditCard"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
          checked={details.payByCard}
          onChange={(e) => onChange("payByCard", e.currentTarget.checked)}
        />
        <span>Pay by credit/debit card</span>
      </label>
    </fieldset>
  );
}
