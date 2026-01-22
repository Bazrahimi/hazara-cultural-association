// app/shop/ui/ContactFields.tsx
"use client";

import type { Contact } from "@/app/_shop/lib/definitions";
import { Input } from "@/app/ui/global/components";
import { CiUser } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";

type Props = {
  value: Contact;
  onChange: (next: Contact) => void;
  disabled?: boolean;
};

export default function ContactFields({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <>
      <Input
        id="fullName"
        label="Full name"
        placeholder="Your full name"
        type="text"
        Icon={CiUser}
        required
        value={value.fullName}
        onChange={(v) => onChange({ ...value, fullName: v })}
        inputProps={{ autoComplete: "name" }}
      />

      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your mobile number"
        Icon={IoIosPhonePortrait}
        type="tel"
        required
        value={value.phone}
        onChange={(v) => onChange({ ...value, phone: v })}
        inputProps={{ disabled }}
      />
    </>
  );
}
