import { Input } from "@/app/ui/global/components";
import { useState } from "react";
import AuAddressAutocomplete from "./AuAddressAutocomplete";

const ShippingAddress = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");

  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        placeholder="Enter you First Name"
        type="text"
        autoComplete="given-name"
        required
      />

      <Input
        id="lastName"
        label="Last Name"
        placeholder="Enter your Last your name"
        type="text"
        autoComplete="family-name"
        required
      />

      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your Mobile number"
        autoComplete="tel"
        type="tel"
        required
      />

      <AuAddressAutocomplete
        onSelect={(a) => {
          // a has: full, streetNumber, street, line1, line2, suburb, state, stateCode, postcode
          setLine1(a.line1);
          setLine2(a.line2);
          setSuburb(a.suburb);
          setState(a.stateCode); // or a.state if you prefer full name
          setPostcode(a.postcode);
        }}
      />
    </>
  );
};

export default ShippingAddress;
