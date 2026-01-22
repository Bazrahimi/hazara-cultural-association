// app/shop/ui/ShippingDetails.tsx
"use client";
import { Contact, FullAddress } from "@/app/_shop/lib/definitions";
import {
  ADDRESS_KEY,
  CONTACT_KEY,
  emptyAddress,
  emptyContact,
  postalLabelFromFull,
  isNonEmpty,
  isPostcode
} from "@/app/_shop/lib/helper";
import { Button } from "@/app/ui/global/components";
import { useMemo, useState } from "react";

import usePersistedState from "../hooks/usePersistedState";
import AuAddressAutocomplete from "./AuAddressAutocomplete";
import AddressFields from "./shipping-details/AddressFields";
import ContactFields from "./shipping-details/ContactFields";
import ManualAddressToggle from "./shipping-details/ManualAddressToggle";

const ShippingDetails = ({ onContinue }: { onContinue: () => void }) => {
  // persisted state (hydration + saving handled by the hook)
  const [fullAddress, setFullAddress] = usePersistedState<FullAddress>(
    ADDRESS_KEY,
    emptyAddress
  );
  const [contact, setContact] = usePersistedState<Contact>(
    CONTACT_KEY,
    emptyContact
  );

  const [manually, setManually] = useState(false);

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


  const canContinue = useMemo(() => {
    const stateLike = (fullAddress.stateCode || fullAddress.state || "").trim();
    return (
 
      isNonEmpty(contact.fullName) &&
      isNonEmpty(contact.phone) &&
      isNonEmpty(fullAddress.address) &&
      isNonEmpty(fullAddress.suburb) &&
      isNonEmpty(stateLike) &&
      isPostcode(fullAddress.postcode)
    );
  }, [contact, fullAddress]);

  const handleContinue = () => {
    // state already persisted by hook; just tell parent to hide/show summary
    onContinue();
  };

  return (
    <>
      <ContactFields value={contact} onChange={setContact} />

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
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue to payment details
          </Button>
        </>
      )}
    </>
  );
};

export default ShippingDetails;
