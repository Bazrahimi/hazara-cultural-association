"use client";
import { ActionButton, FormErrorsMessage, Header, Input, P } from "@/app/_ui";
import { enquiry } from "@/app/contact-us/_lib/action";
import { useActionState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { ENQUIRY_FIELDS as F } from "../_lib/constants";
import MessageField from "./MessageField";
import QueryTypeSelect from "./QueryTypeSelect";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(enquiry, undefined);

  return (
    <form className="space-y-4 relative" action={formAction}>
      <Header align="center" as="h3" size="sm">
        Quick Enquiry
      </Header>

      {/* Name */}
      <Input
        id={F.fullName}
        label="Full Name"
        placeholder="Enter your full name"
        error={state?.errors?.fullName}
        defaultValue={state?.data?.fullName}
        type="text"
        Icon={CiUser}
        required
      />

      {/* Email */}

      <Input
        id={F.email}
        label="Email"
        placeholder="Enter your Email"
        error={state?.errors?.email}
        defaultValue={state?.data?.email}
        type="email"
        Icon={MdEmail}
        required
      />

      {/* Phone (optional) */}
      <Input
        id={F.contactNumber}
        label="Contact Number"
        placeholder="Enter your contact Number"
        error={state?.errors?.contactNumber}
        defaultValue={state?.data?.contactNumber}
        type="text"
        Icon={IoIosPhonePortrait}
      />

      <QueryTypeSelect state={state} />

      <MessageField state={state} />
      <FormErrorsMessage message={state?.message} />

      {/* Submit */}
      <ActionButton
        type="submit"
        isLoading={isPending}
        loadingText="Sending..."
        overlay
        fullWidth
      >
        Send Message
      </ActionButton>

      <P className="text-center text-xs text-gray-500">
        By contacting us, you agree to our community guidelines and privacy
        policy.
      </P>
    </form>
  );
}
