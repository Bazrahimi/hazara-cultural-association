"use client";
import { Header, Input } from "@/app/ui/global/components";
import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { HiAcademicCap, HiCalendar, HiUsers } from "react-icons/hi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdCampaign, MdEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";

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

type FormProps = {
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
  isSubmittingExternal?: boolean; // allow parent control
};

export default function ContactForm({
  onSubmit,
  isSubmittingExternal,
}: FormProps) {
  const [isSendingLocal, setIsSendingLocal] = useState(false);
  const isSending = isSubmittingExternal ?? isSendingLocal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const values: ContactFormValues = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || "") || undefined,
      query: String(data.get("query") || ""),
      message: String(data.get("message") || "") || undefined,
    };

    if (!onSubmit) {
      // demo fallback
      setIsSendingLocal(true);
      setTimeout(() => setIsSendingLocal(false), 1200);
      return;
    }

    try {
      setIsSendingLocal(true);
      await onSubmit(values);
    } finally {
      setIsSendingLocal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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




      {/* Query */}
      <div>
        <label htmlFor="query" className={labelBase}>
          How can we help? <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="query"
            name="query"
            required
            defaultValue=""
            className={fieldBase}
          >
            <option value="" disabled hidden>
              -- Select a query --
            </option>
            <option value="donations">Donations & Support</option>
            <option value="volunteering">Volunteering</option>
            <option value="programs">Cultural Programs & Classes</option>
            <option value="events">Events & Community Gatherings</option>
            <option value="family">
              Family Assistance / Community Support
            </option>
            <option value="advocacy">Advocacy & Media Enquiries</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

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
      <button
        type="submit"
        disabled={isSending}
        className={`w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          isSending ? "opacity-70" : ""
        }`}
      >
        {isSending ? "Sending…" : "Send Message"}
      </button>

      <p className="text-center text-xs text-gray-500">
        By contacting us, you agree to our community guidelines and privacy
        policy.
      </p>
    </form>
  );
}
