"use client";

import clsx from "clsx";

type OptionType = {
  label: string;
  value: string | number;
};

type SelectInputProps = {
  id: string;
  label: string;
  options: ReadonlyArray<OptionType | string | number>; // supports simple arrays too
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  error?: string[]; // optional – same pattern as Input
  className?: string;
  isRTL?: boolean;
};

export function SelectInput({
  id,
  label,
  options,
  defaultValue = "",
  required = false,
  placeholder = "Select",
  error,
  className,
  isRTL = false,
}: SelectInputProps) {
  const hasError = !!error?.length;

  // Normalize simple string arrays into {label,value}
  const normalizedOptions: OptionType[] = options.map((opt) =>
    typeof opt === "string" || typeof opt === "number"
      ? { label: String(opt), value: opt }
      : opt
  );

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className={clsx(
          "block text-sm font-medium text-gray-700",
          isRTL && "text-right"
        )}
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={clsx(
          "mt-1 block w-full rounded-md border border-gray-200",
          "py-2 pr-10 text-sm sm:text-base outline-1",
          "focus:border-hca-blue-main focus:ring-2 focus:ring-blue-100",
          "placeholder:text-gray-500 placeholder:text-xs",
          hasError && "border-red-300 focus:border-red-400 focus:ring-red-100",
          isRTL && "text-right direction-rtl",
          className
        )}
      >
        <option value="">{placeholder}</option>

        {normalizedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && (
        <div
          id={`${id}-error`}
          aria-live="polite"
          aria-atomic="true"
          className={clsx(
            "mt-2 text-xs text-red-600 sm:text-sm",
            isRTL ? "text-left" : "text-right"
          )}
        >
          {error!.map((msg, i) => (
            <p key={`${id}-error-${i}`}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
}
