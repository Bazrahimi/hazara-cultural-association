// app/shop/ui/ContactFields.tsx
"use client";

import { Input } from "@/app/ui/global/components";
import type { Contact } from "@/app/shop/lib/definitions";

type Props = {
  value: Contact;
  onChange: (next: Contact) => void;
  disabled?: boolean;
};

export default function ContactFields({ value, onChange, disabled = false }: Props) {
  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        placeholder="Enter your first name"
        type="text"
        autoComplete="given-name"
        required
        value={value.firstName}
        onChange={(v) => onChange({ ...value, firstName: v })}
        inputProps={{ disabled }}
      />

      <Input
        id="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        type="text"
        autoComplete="family-name"
        required
        value={value.lastName}
        onChange={(v) => onChange({ ...value, lastName: v })}
        inputProps={{ disabled }}
      />

      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your mobile number"
        autoComplete="tel"
        type="tel"
        required
        value={value.phone}
        onChange={(v) => onChange({ ...value, phone: v })}
        inputProps={{ disabled }}
      />
    </>
  );
}
