"use client";
import usePersistedState from "@/app/shop/cart/checkout/hooks/usePersistedState";
import AuAddressAutocomplete from "@/app/shop/cart/checkout/ui/AuAddressAutocomplete";
import AddressFields from "@/app/shop/cart/checkout/ui/shipping-details/AddressFields";
import ManualAddressToggle from "@/app/shop/cart/checkout/ui/shipping-details/ManualAddressToggle";
import { FullAddress } from "@/app/shop/lib/definitions";
import {
  ADDRESS_KEY,
  emptyAddress,
  postalLabelFromFull,
} from "@/app/shop/lib/helper";
import { Button } from "@/app/ui/global/components";
import { useMemo, useState } from "react";

// const initial:FullAddress  = {
//     address: undefined,
//     address2: undefined,
//     suburb: undefined,
//     postcode: undefined,
//     stateCode: undefined,
//     full: undefined,
//   };

const AddressForm = () => {
  // const [state, formAction, isPending] = useActionState<
  //   BillingAddressInputState | undefined
  // >(billingAddressInput, undefined);
  const [manually, setManually] = useState(false);
  // const [fullAddress, setFullAddress] = usePersistedState<FullAddress>(
  //   ADDRESS_KEY,
  //   emptyAddress
  // );

  // const [fullAddress,setFullAddress  ] = useState(initial)

  const [fullAddress, setFullAddress] = usePersistedState<FullAddress>(
    ADDRESS_KEY,
    emptyAddress
  );

  // Show fields if user chose manual entry OR has saved/selected parts
  const showFields = useMemo(
    () =>
      manually ||
      !!fullAddress.address ||
      !!fullAddress.suburb ||
      !!fullAddress.postcode,
    [manually, fullAddress]
  );

  const defaultAutoLabel = useMemo(
    () => postalLabelFromFull(fullAddress),
    [fullAddress]
  );
  return (
    <>
      {!manually && (
        <AuAddressAutocomplete
          defaultValue={defaultAutoLabel}
          onSelect={(a) =>
            setFullAddress({
              ...fullAddress,
              full: a.full,
              address: a.address,
              address2: a.address2,
              suburb: a.suburb,
              state: a.state,
              stateCode: a.stateCode,
              postcode: a.postcode,
            })
          }
        />
      )}

      <ManualAddressToggle manually={manually} setManually={setManually} />

      {showFields && (
        <>
          <AddressFields value={fullAddress} onChange={setFullAddress} />

          <Button
            type="button"
            // onClick={handleContinue}
            // disabled={!canContinue}
          >
            Continue to payment details
          </Button>
        </>
      )}
    </>
  );
};

export default AddressForm;
