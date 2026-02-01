"use client";

import { Button } from "@/app/_ui";
import { useActionState, useState } from "react";
import { billingAddressInput } from "../lib/action";
import AddressAutoComplete from "../lib/AddressAutoComplete";
import type { BillingAddressInput } from "../lib/schema";
import AddressFields from "./AddressFields";

const AddressForm = ({ initial }: { initial: BillingAddressInput }) => {
  // Server action state must match the action's return type
  const [actionState, formAction, isPending] = useActionState(
    billingAddressInput,
    undefined,
  );

  // Local controlled state that drives the inputs
  const [address, setAddress] = useState<BillingAddressInput>(initial);

  return (
    <>
      <AddressAutoComplete
        label="Search your address"
        placeholder="Start typing your address (AU only)…"
        onSelect={(a) =>
          setAddress({
            ...address,
            address: a.address,
            address2: a.address2 ?? "",
            suburb: a.suburb,
            state: a.state, // make sure AddressAutoComplete returns `state`
            postcode: a.postcode ?? "",
            country: "AU", // store code; schema uppercases anyway
          })
        }
      />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            or fill in details below
          </span>
        </div>
      </div>

      {/* Native form submit: inputs must have `name`s so FormData works */}
      <form action={formAction} className="space-y-4">
        <AddressFields
          value={address}
          onChange={setAddress}
          errors={actionState?.errors}
        />

        {actionState?.message && (
          <p className="text-sm text-red-600">{actionState.message}</p>
        )}

        <Button fullWidth type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save your Address"}
        </Button>
      </form>
    </>
  );
};

export default AddressForm;
