"use client";

import { cn } from "@/app/_lib/helper";
import type { EnquiryState } from "../_lib/definitions";

import { QUERY_OPTIONS, ENQUIRY_FIELDS as F } from "../_lib/constants";

type Props = {
  state?: EnquiryState;
};

export default function QueryTypeSelect({ state }: Props) {
  const hasError = !!state?.errors?.queryType?.length;

  const defaultValue =
    typeof state?.data?.queryType === "string" ? state.data.queryType : "";

  const queryTypeLabel =
    defaultValue && Number(defaultValue) in QUERY_OPTIONS
      ? QUERY_OPTIONS[Number(defaultValue) as keyof typeof QUERY_OPTIONS]
      : "";
  return (
    <>
      <label
        htmlFor={F.queryType}
        className="block text-sm font-medium text-gray-700"
      >
        How can we help
      </label>

      <select
        key={defaultValue}
        name={F.queryType}
        id={F.queryType}
        defaultValue={defaultValue}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? "queryType-error" : undefined}
        className={cn(
          "w-full rounded-md border border-gray-200 py-2 pr-10 text-sm sm:text-base outline-1 focus:border-blue-600 focus:ring-2 focus:ring-blue-400",
          hasError && "border-red-300 focus:border-red-400 focus:ring-red-100",
        )}
 
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

      <input type="hidden" name="queryTypeLabel" value={queryTypeLabel} />

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
