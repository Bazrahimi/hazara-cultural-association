"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { P } from "./paragraph";

type CheckboxProps = {
  id: string;
  name?: string;
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  error?: string[];
  className?: string;
  isRTL?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      id,
      name,
      label,
      description,
      checked,
      defaultChecked,
      onChange,
      required = false,
      error,
      className,
      isRTL = false,
    },
    ref
  ) {
    const hasError = !!error?.length;

    return (
      <div className={clsx("space-y-1", className)}>
        <label
          htmlFor={id}
          className={clsx(
            "flex cursor-pointer items-start gap-2 text-sm text-gray-800",
            isRTL && "flex-row-reverse text-right"
          )}
        >
          <input
            id={id}
            name={name ?? id}
            type="checkbox"
            ref={ref}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={(e) => onChange?.(e.target.checked)}
            required={required}
            className={clsx(
              "mt-1 h-4 w-4 rounded border-gray-300 text-blue-600",
              "focus:ring-blue-500 focus:ring-2 focus:ring-offset-1"
            )}
          />

          <span className="select-none">
            {label}
            {required && <span className="ml-0.5 text-red-500">*</span>}
          </span>
        </label>

        {description && (
          <P className={clsx("text-gray-600", isRTL && "text-right")} size="sm">
            {description}
          </P>
        )}

        {hasError && (
          <div
            id={`${id}-error`}
            aria-live="polite"
            aria-atomic="true"
            className={clsx(
              "text-xs text-red-600",
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
);
