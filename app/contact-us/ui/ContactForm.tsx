// app/components/HcaContactBasic.tsx
"use client";
import clsx from "clsx";

import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { HiAcademicCap, HiCalendar, HiUsers } from "react-icons/hi";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdVolunteerActivism,
} from "react-icons/md";

import { MdCampaign } from "react-icons/md";

const fieldBase =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600";
const labelBase = "block text-sm font-medium text-gray-700";

export default function HcaContactBasic() {
  const [isSending, setIsSending] = useState(false);

  // demo-only submit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => setIsSending(false), 1200);
  };

  return (
    <section className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">
      {/* Header / blurb */}
      <div className="flex items-start gap-3">
        <MdVolunteerActivism
          className="mt-0.5 text-2xl text-blue-600"
          aria-hidden
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Hazara Cultural Association
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            We usually reply within <strong>1–2 business days</strong>. Reach
            out about cultural programs, community events, volunteering,
            donations, or advocacy support.
          </p>
        </div>
      </div>

      {/* Quick org details (placeholders) */}
      <div className="grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-800 sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <MdPhone className="text-gray-600" aria-hidden />{" "}
          <span>Phone: 0000 000 000</span>
        </p>
        <p className="flex items-center gap-2">
          <MdEmail className="text-gray-600" aria-hidden />{" "}
          <span>Email: info@hazara.org.au</span>
        </p>
        <p className="col-span-1 sm:col-span-2 flex items-center gap-2">
          <MdLocationOn className="text-gray-600" aria-hidden />{" "}
          <span>Melbourne, Victoria, Australia</span>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelBase}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your full name"
            className={fieldBase}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelBase}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldBase}
          />
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="0000 000 000"
            className={fieldBase}
          />
        </div>

        {/* Query Type — nonprofit specific */}
        <div>
          <label htmlFor="topic" className={labelBase}>
            How can we help? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="topic"
              name="topic"
              required
              defaultValue=""
              className={fieldBase}
            >
              <option value="" disabled hidden>
                -- Select a topic --
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

        {/* Simple CTA row with topic icons (purely visual, optional) */}
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
          className={clsx(
            "w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200",
            isSending && "opacity-70"
          )}
        >
          {isSending ? "Sending…" : "Send Message"}
        </button>

        {/* Helper text */}
        <p className="text-center text-xs text-gray-500">
          By contacting us, you agree to our community guidelines and privacy
          policy.
        </p>
      </form>
    </section>
  );
}
