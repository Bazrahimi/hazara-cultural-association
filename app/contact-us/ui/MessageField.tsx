"use client";

import { cn } from "@/app/_lib/helper";
import { ENQUIRY_FIELDS as F } from "../_lib/constants";
import { EnquiryState } from "../_lib/definitions";

const MessageField = ({ state }: { state?: EnquiryState }) => {
  const hasError = !!state?.errors?.qMessage?.length;
  return (
    <div>
      <label
        htmlFor={F.qMessage}
        className="block text-sm font-medium text-gray-700"
      >
        Message
      </label>
      <textarea
        id={F.qMessage}
        name={F.qMessage}
        rows={5}
        placeholder="Tell us a little about your enquiry…"
        defaultValue={state?.data?.qMessage ?? ""}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? "qMessage-error" : undefined}
        className={cn(
          "mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600",
          "min-h-[120px]",
          hasError && "border-red-300 focus:border-red-400 focus:ring-red-100",
        )}
      />
      {hasError && (
        <p
          id={`${F.qMessage}-error`}
          role="status"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {state?.errors?.qMessage?.[0]}
        </p>
      )}
    </div>
  );
};

export default MessageField;
