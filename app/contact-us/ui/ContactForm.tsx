"use client";
import { submitEnquiry } from "@/app/contact-us/_lib/action";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import StatusBanner from "@/app/ui/global/FormMessage";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import clsx from "clsx";
import { useActionState, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export const QUERY_OPTIONS: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string> = {
  1: "Donations & Support",
  2: "Volunteering",
  3: "Cultural Programs & Classes",
  4: "Events & Community Gatherings",
  5: "Family Assistance / Community Support",
  6: "Advocacy & Media Enquiries",
  7: "Other",
};

const fieldBase =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600";
const labelBase = "block text-sm font-medium text-gray-700";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitEnquiry,
    undefined,
  );
  const [selectedLabel, setSelectedLabel] = useState("");

  const hasQueryTypeError = !!state?.errors?.queryType?.length;
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

      <label
        htmlFor="queryType"
        className="block text-sm font-medium text-gray-700"
      >
        How can we help
      </label>

      <select
        name="queryType"
        id="queryType"
        // required
        // preserve selection after server validation:
        defaultValue={state?.queryType != null ? String(state.queryType) : ""}
        aria-invalid={hasQueryTypeError || undefined}
        aria-describedby={hasQueryTypeError ? "queryType-error" : undefined}
        className={clsx(
          "w-full rounded-md border border-gray-200 py-2 pr-10 text-sm sm:text-base outline-1 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-400",
          hasQueryTypeError &&
            "border-red-300 focus:border-red-400 focus:ring-red-100",
        )}
        onChange={(e) => {
          const value = Number(e.target.value) as keyof typeof QUERY_OPTIONS;
          setSelectedLabel(QUERY_OPTIONS[value]);
        }}
      >
        {/* Placeholder option; keep it disabled so a choice is required */}
        <option value="" disabled hidden>
          Select your Query type
        </option>

        {Object.entries(QUERY_OPTIONS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Hidden input → ensures label is submitted */}
      <input type="hidden" name="queryTypeLabel" value={selectedLabel} />

      {/* Unique id for the error; link via aria-describedby above */}
      {hasQueryTypeError ? (
        <div
          id="queryType-error"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 text-right text-xs text-red-600 sm:text-sm"
        >
          {/* show first message or all, your choice */}
          <p>{state?.errors?.queryType}</p>
          {/* or map all:
    {state.errors.queryType.map((msg, i) => <p key={i}>{msg}</p>)} */}
        </div>
      ) : null}

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
