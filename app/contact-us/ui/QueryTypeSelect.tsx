"use client";

import { cn } from "@/app/_lib/helper";
import { useEffect, useMemo, useState } from "react";
import type { EnquiryState } from "../_lib/definitions";
import { ENQUIRY_FIELDS, QUERY_OPTIONS } from "./ContactForm";

type Props = {
  state?: EnquiryState;
};

export default function QueryTypeSelect({ state }: Props) {
  const [selectedLabel, setSelectedLabel] = useState("");

  const hasError = !!state?.errors?.queryType?.length;

  // queryType stored as string in state.data ("" or "5")
  const defaultValue = useMemo(() => {
    const q = state?.data?.queryType;
    return typeof q === "string" ? q : "";
  }, [state?.data?.queryType]);

  useEffect(() => {
    const q = state?.data?.queryType;

    // empty / not set
    if (!q || typeof q !== "string") {
      setSelectedLabel("");
      return;
    }

    // q is "5" -> convert to number to index QUERY_OPTIONS
    const n = Number(q);
    if (!Number.isFinite(n) || !(n in QUERY_OPTIONS)) {
      setSelectedLabel("");
      return;
    }

    setSelectedLabel(QUERY_OPTIONS[n as keyof typeof QUERY_OPTIONS]);
  }, [state?.data?.queryType]);

  return (
    <>
      <label
        htmlFor={ENQUIRY_FIELDS.queryType}
        className="block text-sm font-medium text-gray-700"
      >
        How can we help
      </label>

      <select
        key={defaultValue}
        name={ENQUIRY_FIELDS.queryType}
        id={ENQUIRY_FIELDS.queryType}
        defaultValue={defaultValue}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? "queryType-error" : undefined}
        className={cn(
          "w-full rounded-md border border-gray-200 py-2 pr-10 text-sm sm:text-base outline-1 focus:border-blue-600 focus:ring-2 focus:ring-blue-400",
          hasError && "border-red-300 focus:border-red-400 focus:ring-red-100",
        )}
        onChange={(e) => {
          const n = Number(e.target.value);
          setSelectedLabel(
            Number.isFinite(n) && n in QUERY_OPTIONS
              ? QUERY_OPTIONS[n as keyof typeof QUERY_OPTIONS]
              : "",
          );
        }}
      >
        <option value="" disabled>
          Select your Query type
        </option>

        {Object.entries(QUERY_OPTIONS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <input type="hidden" name="queryTypeLabel" value={selectedLabel} />

      {hasError && (
        <div
          id="queryType-error"
          role="status"
          aria-live="polite"
          className="mt-2 text-right text-xs text-red-600 sm:text-sm"
        >
          {state?.errors?.queryType?.[0]}
        </div>
      )}
    </>
  );
}
