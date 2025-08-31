"use client";
import { Contact, FullAddress } from "@/app/shop/lib/definitions";
import {
  ADDRESS_KEY,
  CONTACT_KEY,
  emptyAddress,
  emptyContact,
  postalLabelFromFull,
} from "@/app/shop/lib/helper";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useMemo, useState } from "react";
import AuAddressAutocomplete from "./AuAddressAutocomplete";
import ContactFields from "./shipping-details/ContactFields";

// Build "Address, SUBURB STATE POSTCODE" like your dropdown

const ShippingDetails = ({ onContinue }: { onContinue: () => void }) => {
  // live editable state
  const [fullAddress, setFullAddress] = useState<FullAddress>(emptyAddress);
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [manually, setManually] = useState(false);

  useEffect(() => {
    try {
      const rawA = localStorage.getItem(ADDRESS_KEY);
      if (rawA)
        setFullAddress({
          ...emptyAddress,
          ...(JSON.parse(rawA) as Partial<FullAddress>),
        });
      const rawC = localStorage.getItem(CONTACT_KEY);
      if (rawC)
        setContact({
          ...emptyContact,
          ...(JSON.parse(rawC) as Partial<Contact>),
        });
    } catch {}
  }, []);

  // --- PERSIST on change
  useEffect(() => {
    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(fullAddress));
    } catch (e) {
      console.warn("Failed to persist address", e);
    }
  }, [fullAddress]);

  useEffect(() => {
    try {
      localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
    } catch (e) {
      console.warn("Failed to persist contact", e);
    }
  }, [contact]);

  // Show fields if user chose manual entry OR has saved/selected parts
  const showFields = useMemo(
    () =>
      manually ||
      !!fullAddress.address ||
      !!fullAddress.suburb ||
      !!fullAddress.postcode,
    [manually, fullAddress]
  );

  // Use saved label to seed the autocomplete input
  const defaultAutoLabel = useMemo(
    () => postalLabelFromFull(fullAddress),
    [fullAddress]
  );

  // Helpers for button enablement
  const isNonEmpty = (s?: string) => !!s && s.trim().length > 0;
  const isPostcode = (s?: string) => !!s && /^\d{4}$/.test(s);

  const canContinue = useMemo(() => {
    const stateLike = (fullAddress.stateCode || fullAddress.state || "").trim();
    return (
      isNonEmpty(contact.firstName) &&
      isNonEmpty(contact.lastName) &&
      isNonEmpty(contact.phone) &&
      isNonEmpty(fullAddress.address) &&
      isNonEmpty(fullAddress.suburb) &&
      isNonEmpty(stateLike) &&
      isPostcode(fullAddress.postcode)
    );
  }, [contact, fullAddress]);

  // Continue: hide inputs and load summary FROM localStorage
  const handleContinue = () => {
    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(fullAddress));
      localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
    } catch {}
    onContinue(); // parent hides & shows summary
  };

  // If we're hiding inputs, just render the summary and bail out early

  return (
    <>
      <ContactFields value={contact} onChange={(next) => setContact(next)} />

      {/* Autocomplete (hidden when typing manually) */}
      {!manually && (
        <AuAddressAutocomplete
          defaultValue={defaultAutoLabel}
          onSelect={(a) =>
            setFullAddress({
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

      {/* Toggle helper */}

      <>
        {!manually ? (
          <P
            onClick={() => setManually(true)}
            role="button"
            tabIndex={0}
            className="mt-2 cursor-pointer underline text-gray-600 hover:text-gray-800"
          >
            Or click here to enter your address manually
          </P>
        ) : (
          <P
            onClick={() => setManually(false)}
            role="button"
            tabIndex={0}
            className="mt-2 cursor-pointer underline text-gray-600 hover:text-gray-800"
          >
            Or complete your address using autocomplete
          </P>
        )}
      </>

      {/* Address fields (manual or after selection) */}
      {showFields && (
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="address"
              label="Address"
              type="text"
              value={fullAddress.address}
              onChange={(v) => setFullAddress((p) => ({ ...p, address: v }))}
              placeholder="e.g. 12 Smith Street"
              autoComplete="street-address"
              required
            />
            <Input
              id="address2"
              label="Address line 2"
              type="text"
              value={fullAddress.address2}
              onChange={(v) => setFullAddress((p) => ({ ...p, address2: v }))}
              placeholder="Unit, Level, Building (optional)"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              id="suburb"
              label="Suburb"
              type="text"
              value={fullAddress.suburb}
              onChange={(v) => setFullAddress((p) => ({ ...p, suburb: v }))}
              placeholder="e.g. Dandenong"
              required
            />
            <Input
              id="state"
              label="State"
              type="text"
              value={fullAddress.stateCode || fullAddress.state}
              onChange={(v) =>
                setFullAddress((p) => ({ ...p, stateCode: v, state: v }))
              }
              placeholder="e.g. VIC"
              required
            />
            <Input
              id="postcode"
              label="Postcode"
              type="text"
              value={fullAddress.postcode}
              onChange={(v) => setFullAddress((p) => ({ ...p, postcode: v }))}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              placeholder="e.g. 3177"
              required
            />
          </div>

          <Button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue to payment details
          </Button>
        </div>
      )}
    </>
  );
};

export default ShippingDetails;
