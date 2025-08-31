"use client";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useMemo, useState } from "react";
import AuAddressAutocomplete, {
  ParsedAuAddress,
} from "./AuAddressAutocomplete";

type FullAddress = Pick<
  ParsedAuAddress,
  | "full"
  | "address"
  | "address2"
  | "suburb"
  | "state"
  | "stateCode"
  | "postcode"
>;

type Contact = {
  firstName: string;
  lastName: string;
  phone: string;
};

const ADDRESS_KEY = "hca_shipping_address";
const CONTACT_KEY = "hca_shipping_contact";

const emptyAddress: FullAddress = {
  full: "",
  address: "",
  address2: "",
  suburb: "",
  state: "",
  stateCode: "",
  postcode: "",
};

const emptyContact: Contact = {
  firstName: "",
  lastName: "",
  phone: "",
};

// Build "Address, SUBURB STATE POSTCODE" like your dropdown
function postalLabelFromFull(a: FullAddress) {
  const suburb = a.suburb?.toUpperCase() || "";
  const state = a.stateCode || a.state || "";
  const tail = [suburb, state, a.postcode].filter(Boolean).join(" ").trim();
  return a.address && tail ? `${a.address}, ${tail}` : a.address || "";
}

const ShippingAddress = () => {
  // live editable state
  const [fullAddress, setFullAddress] = useState<FullAddress>(emptyAddress);
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [manually, setManually] = useState(false);
  const [hideInputs, setHideInputs] = useState<boolean>(false);

  // summary states (explicitly loaded from localStorage when continue is clicked)
  const [summaryAddress, setSummaryAddress] =
    useState<FullAddress>(emptyAddress);
  const [summaryContact, setSummaryContact] = useState<Contact>(emptyContact);

  // --- HYDRATE from localStorage on mount
  useEffect(() => {
    try {
      const rawA = localStorage.getItem(ADDRESS_KEY);
      if (rawA) {
        const a = JSON.parse(rawA) as Partial<FullAddress>;
        setFullAddress({
          full: a.full ?? "",
          address: a.address ?? "",
          address2: a.address2 ?? "",
          suburb: a.suburb ?? "",
          state: a.state ?? "",
          stateCode: a.stateCode ?? "",
          postcode: a.postcode ?? "",
        });
      }
      const rawC = localStorage.getItem(CONTACT_KEY);
      if (rawC) {
        const c = JSON.parse(rawC) as Partial<Contact>;
        setContact({
          firstName: c.firstName ?? "",
          lastName: c.lastName ?? "",
          phone: c.phone ?? "",
        });
      }
    } catch (e) {
      console.warn("Failed to hydrate checkout info", e);
    }
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
      // Ensure latest values are saved
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(fullAddress));
      localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));

      // Read back from localStorage for the summary block
      const rawA = localStorage.getItem(ADDRESS_KEY);
      const rawC = localStorage.getItem(CONTACT_KEY);

      if (rawA) setSummaryAddress(JSON.parse(rawA));
      if (rawC) setSummaryContact(JSON.parse(rawC));
    } catch (e) {
      console.warn("Failed to finalize checkout info", e);
      // still fall back to in-memory state
      setSummaryAddress(fullAddress);
      setSummaryContact(contact);
    } finally {
      setHideInputs(true);
    }
  };

  // If we're hiding inputs, just render the summary and bail out early
  if (hideInputs) {
    return (
      <div className="mt-4 rounded-md border border-gray-200 p-4 space-y-2">
        <P>
          <span className="font-semibold">Name: </span>
          {summaryContact.firstName} {summaryContact.lastName}
        </P>
        <P>
          <span className="font-semibold">Contact: </span>
          {summaryContact.phone}
        </P>
        <P>
          <span className="font-semibold">Address: </span>
          {postalLabelFromFull(summaryAddress)}
          {summaryAddress.address2 ? `, ${summaryAddress.address2}` : ""}
        </P>

        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setHideInputs(false)}
          >
            Edit details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        placeholder="Enter your first name"
        type="text"
        autoComplete="given-name"
        required
        value={contact.firstName}
        onChange={(v) => setContact((p) => ({ ...p, firstName: v }))}
      />

      <Input
        id="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        type="text"
        autoComplete="family-name"
        required
        value={contact.lastName}
        onChange={(v) => setContact((p) => ({ ...p, lastName: v }))}
      />

      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your mobile number"
        autoComplete="tel"
        type="tel"
        required
        value={contact.phone}
        onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
      />

      {/* Autocomplete (hidden when typing manually) */}
      {!manually && !hideInputs && (
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
      {!hideInputs && (
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
      )}

      {/* Address fields (manual or after selection) */}
      {!hideInputs && showFields && (
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
              inputClassName="placeholder:text-xs"
              required
            />
            <Input
              id="address2"
              label="Address line 2"
              type="text"
              value={fullAddress.address2}
              onChange={(v) => setFullAddress((p) => ({ ...p, address2: v }))}
              placeholder="Unit, Level, Building (optional)"
              inputClassName="placeholder:text-xs"
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
              inputClassName="placeholder:text-xs"
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
              inputClassName="placeholder:text-xs"
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
              inputClassName="placeholder:text-xs"
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

export default ShippingAddress;
