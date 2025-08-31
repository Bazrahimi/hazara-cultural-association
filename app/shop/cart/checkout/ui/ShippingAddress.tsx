"use client";
import { Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useMemo, useState } from "react";
import AuAddressAutocomplete, { ParsedAuAddress } from "./AuAddressAutocomplete";

type FullAddress = Pick<
  ParsedAuAddress,
  "full" | "address" | "address2" | "suburb" | "state" | "stateCode" | "postcode"
>;

const STORAGE_KEY = "hca_shipping_address";

const emptyAddress: FullAddress = {
  full: "",
  address: "",
  address2: "",
  suburb: "",
  state: "",
  stateCode: "",
  postcode: "",
};

// Build "Address, SUBURB STATE POSTCODE" like your dropdown
function postalLabelFromFull(a: FullAddress) {
  const suburb = a.suburb?.toUpperCase() || "";
  const state = a.stateCode || a.state || "";
  const tail = [suburb, state, a.postcode].filter(Boolean).join(" ").trim();
  return a.address && tail ? `${a.address}, ${tail}` : a.address || "";
}

const ShippingAddress = () => {
  const [fullAddress, setFullAddress] = useState<FullAddress>(emptyAddress);
  const [manually, setManually] = useState(false);

  // --- HYDRATE from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<FullAddress>;
      // light sanity check
      if (parsed && typeof parsed === "object") {
        setFullAddress({
          full: parsed.full ?? "",
          address: parsed.address ?? "",
          address2: parsed.address2 ?? "",
          suburb: parsed.suburb ?? "",
          state: parsed.state ?? "",
          stateCode: parsed.stateCode ?? "",
          postcode: parsed.postcode ?? "",
        });
      }
    } catch (e) {
      console.warn("Failed to hydrate shipping address", e);
    }
  }, []);

  // --- PERSIST to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullAddress));
    } catch (e) {
      console.warn("Failed to persist shipping address", e);
    }
  }, [fullAddress]);

  // Show fields if user chose manual entry OR has saved/selected parts
  const showFields = useMemo(
    () => manually || !!fullAddress.address || !!fullAddress.suburb || !!fullAddress.postcode,
    [manually, fullAddress]
  );

  // Use saved label to seed the autocomplete input
  const defaultAutoLabel = useMemo(() => postalLabelFromFull(fullAddress), [fullAddress]);

  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        placeholder="Enter your first name"
        type="text"
        autoComplete="given-name"
        required
      />

      <Input
        id="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        type="text"
        autoComplete="family-name"
        required
      />

      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your mobile number"
        autoComplete="tel"
        type="tel"
        required
      />

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

      
        </div>
      )}
    </>
  );
};

export default ShippingAddress;
