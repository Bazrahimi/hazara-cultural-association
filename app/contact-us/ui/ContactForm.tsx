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

import { ActionButton } from "@/app/ui/global/clientComponent";

const fieldBase =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600";
const labelBase = "block text-sm font-medium text-gray-700";

export type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  query: string;
  message?: string;
};

export default function ContactForm() {
  return (
    <form className="space-y-4 relative">
      <Header align="center" as="h3" size="sm">
        Quick Enquiry
      </Header>

      {/* Name */}
      <Input
        id="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        error={[]}
        defaultValue=""
        type="text"
        Icon={CiUser}
        required
      />

      {/* Email */}

      <Input
        id="email"
        label="Email"
        placeholder="Enter your Email"
        error={[]}
        defaultValue=""
        type="email"
        Icon={MdEmail}
        required
      />

      {/* Phone (optional) */}
      <Input
        id="contactNumber"
        label="Contact Number"
        placeholder="Enter your contact Number"
        error={[]}
        defaultValue=""
        type="text"
        Icon={IoIosPhonePortrait}
      />

      <InputAutocomplete
        id="query"
        label="How can we help"
        placeholder="Select your Query Type..."
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
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a little about your enquiry…"
          className={`${fieldBase} min-h-[120px]`}
        />
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
        isLoading={false}
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
