"use client";
import {
  Header,
  Input,
  InputAutocomplete,
  P,
} from "@/app/ui/global/components";
import { CiUser } from "react-icons/ci";
import { FaHandHoldingHeart } from "react-icons/fa";
import { HiAcademicCap, HiCalendar, HiUsers } from "react-icons/hi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdCampaign, MdEmail } from "react-icons/md";

import { submitEnquiry } from "@/app/lib/action";
import { ActionButton } from "@/app/ui/global/clientComponent";
import StatusBanner from "@/app/ui/global/FormMessage";
import { useActionState } from "react";

const fieldBase =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600";
const labelBase = "block text-sm font-medium text-gray-700";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitEnquiry,
    undefined
  );
  return (
    <form className="space-y-4 relative" action={formAction}>
      <Header align="center" as="h3" size="sm">
        Quick Enquiry
      </Header>

      {/* Name */}
      <Input
        id="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        error={state?.errors?.fullName}
        defaultValue={state?.fullName}
        type="text"
        Icon={CiUser}
        required
      />

      {/* Email */}

      <Input
        id="email"
        label="Email"
        placeholder="Enter your Email"
        error={state?.errors?.email}
        defaultValue={state?.email}
        type="email"
        Icon={MdEmail}
        required
      />

      {/* Phone (optional) */}
      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your contact Number"
        error={state?.errors?.contactNumber}
        defaultValue={state?.contactNumber}
        type="text"
        Icon={IoIosPhonePortrait}
      />

      <InputAutocomplete
        id="queryType"
        label="How can we help"
        placeholder="Select your Query Type..."
        defaultValue={state?.queryType}
        type="text"
        required
        mustMatch
        options={[
          "Donations & Support",
          "Volunteering",
          "Cultural Programs & Classes",
          "Events & Community Gatherings",
          "Family Assistance / Community Support",
          "Advocacy & Media Enquiries",
          "Other",
        ]}
      />

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelBase}>
          Message
        </label>
        <textarea
          id="qMessage"
          name="qMessage"
          rows={5}
          placeholder="Tell us a little about your enquiry…"
          defaultValue={state?.qMessage}
          className={`${fieldBase} min-h-[120px]`}
        />
        {state?.errors?.qMessage?.length && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.qMessage[0]}
          </p>
        )}
      </div>

      {/* Visual query chips */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1">
          <FaHandHoldingHeart className="text-blue-600" /> Donations
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1">
          <HiUsers className="text-blue-600" /> Volunteering
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1">
          <HiAcademicCap className="text-blue-600" /> Programs
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1">
          <HiCalendar className="text-blue-600" /> Events
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1">
          <MdCampaign className="text-blue-600" /> Advocacy
        </span>
      </div>

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
      {!isPending && state && (
        <StatusBanner ok={state.ok} message={state.message} />
      )}

      <P className="text-center text-xs text-gray-500">
        By contacting us, you agree to our community guidelines and privacy
        policy.
      </P>
    </form>
  );
}
