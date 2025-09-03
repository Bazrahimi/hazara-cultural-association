"use client";
// import AddressFields from "@/app/shop/cart/checkout/ui/shipping-details/AddressFields";
import AddressFields from "./AddressFields";

import { Button } from "@/app/ui/global/components";
import { useState } from "react";
import AddressAutoComplete from "../lib/AddressAutoComplete";
import { BillingAddressInput } from "../lib/schema";

const AddressForm = ({ initial }: { initial: BillingAddressInput }) => {
  // const [state, formAction, isPending] = useActionState<
  //   BillingAddressInputState | undefined
  // >(billingAddressInput, undefined);
  const [manually, setManually] = useState(false);
  // const [address, setAddress] = usePersistedState<Address>(
  //   ADDRESS_KEY,
  //   emptyAddress
  // );

  const [address, setAddress] = useState(initial);

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
            state: a.state,
            postcode: a.postcode ?? "",
            country: a.country,
          })
        }
      />
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

      <AddressFields value={address} onChange={setAddress} />

      <Button
        fullWidth
        // onClick={handleContinue}
        // disabled={!canContinue}
      >
        Save your Address
      </Button>
    </>
  );
};

export default AddressForm;
