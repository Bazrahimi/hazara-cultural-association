"use client";

import { inter } from "@/app/lib/font";
import { cn } from "@/app/lib/helper";
import clsx from "clsx";
import Link from "next/link";
import React, { forwardRef, ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";

export type BaseInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "email" | "password" | "tel" | "date";
  value?: string | number;
  onChange?: (v: string) => void;
  defaultValue?: string | number;
  error?: string[];
  Icon?: IconType;
  required?: boolean;
  autoComplete?: string;
  inputClassName?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "id"
    | "name"
    | "type"
    | "value"
    | "defaultValue"
    | "placeholder"
    | "required"
    | "className"
    | "onChange"
  >;
  endAdornment?: React.ReactNode;

  /** NEW: Enable right-to-left layout for Hazaragi/Dari */
  isRTL?: boolean;
  readOnly?: boolean;
};

export const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  function Input(
    {
      id,
      label,
      placeholder,
      type,
      value,
      onChange,
      defaultValue,
      Icon,
      error,
      required = false,
      autoComplete,
      inputProps,
      inputClassName,
      endAdornment,
      min,
      max,
      step,
      isRTL = false, // <— NEW
      readOnly = false,
    },
    ref
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && isPasswordVisible ? "text" : type;

    const hasError = !!error?.length;

    const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);

    const inputMode =
      type === "email"
        ? "email"
        : type === "text"
          ? "text"
          : type === "number"
            ? "numeric"
            : type === "tel"
              ? "tel"
              : undefined;

    // Padding: flip for RTL so text doesn't overlap the icons
    const leftPad = Icon
      ? isRTL
        ? "pr-10 sm:pr-11"
        : "pl-10 sm:pl-11"
      : isRTL
        ? "pr-3 sm:pr-4"
        : "pl-3 sm:pl-4";

    return (
      <div className="mb-5" data-required={required || undefined}>
        <label
          htmlFor={id}
          className={clsx(
            "block text-sm font-medium text-gray-700",
            isRTL && "text-right" // <— label alignment
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden>
              *
            </span>
          )}
        </label>

        <div className="relative">
          {value !== undefined ? (
            <input
              {...{
                id,
                name: id,
                type: inputType,
                placeholder,
                required,
                min,
                max,
                step,
                inputMode,
                autoComplete:
                  autoComplete ??
                  (type === "password" ? "current-password" : "off"),
                ref,
                value,
                onChange: (e) => onChange?.(e.currentTarget.value),
                readOnly,
              }}
              {...inputProps}
              className={clsx(
                "peer block w-full rounded-md border border-gray-200",
                "py-2 pr-10 text-sm sm:text-base outline-1 placeholder:text-gray-500 placeholder:text-xs",
                "focus:border-hca-blue-main focus:ring-2 focus:ring-blue-100",
                leftPad,
                hasError &&
                  "border-red-300 focus:border-red-400 focus:ring-red-100",
                isRTL && "text-right",
                isRTL && "direction-rtl",
                readOnly && "bg-gray-100 text-gray-500 cursor-not-allowed",
                inputClassName
              )}
            />
          ) : (
            <input
              {...{
                id,
                name: id,
                type: inputType,
                placeholder,
                required,
                min,
                max,
                step,
                inputMode,
                autoComplete:
                  autoComplete ??
                  (type === "password" ? "current-password" : "off"),
                ref,
                readOnly,
                defaultValue,
              }}
              {...inputProps}
              className={clsx(
                "peer block w-full rounded-md border border-gray-200",
                "py-2 pr-10 text-sm sm:text-base outline-1 placeholder:text-gray-500 placeholder:text-xs",
                "focus:border-hca-blue-main focus:ring-2 focus:ring-blue-100",
                leftPad,
                hasError &&
                  "border-red-300 focus:border-red-400 focus:ring-red-100",
                isRTL && "text-right",
                isRTL && "direction-rtl",
                readOnly && "bg-gray-100 text-gray-500 cursor-not-allowed",
                inputClassName
              )}
            />
          )}

          {/* Left icon — stays LTR, even in RTL */}
          {Icon && (
            <Icon
              className={clsx(
                "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 sm:h-6 sm:w-6 peer-focus:text-gray-900",
                isRTL ? "right-3" : "left-3" // <— flip icon position
              )}
              aria-hidden
            />
          )}

          {/* Password visibility toggle — stays on the RIGHT (best UX) */}
          {type === "password" ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 focus:outline-none"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <IoEyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <IoEye className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          ) : endAdornment ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {endAdornment}
            </div>
          ) : null}
        </div>

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
);

export type InputOption = string | { value: string; label?: string };

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface BaseButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    as?: "button";
  };

type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    as: "link";
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-hca-yellow-main text-hca-blue-main hover:bg-hca-yellow-light focus:ring-yellow-300",
  secondary:
    "bg-hca-blue-main text-white hover:bg-hca-blue-light focus:ring-blue-300",
  danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-300",
  outline:
    "border border-hca-blue-main bg-white text-hca-blue-main hover:bg-gray-50 focus:ring-gray-200",
};

const sizes: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm",
  sm: "px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base",
  md: "px-6 py-3 text-base sm:px-7 sm:py-3.5 sm:text-lg",
  lg: "px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    as = "button",
    children,
    icon,
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    ...rest
  } = props as ButtonProps;

  const layout = fullWidth ? "flex w-full justify-center" : "inline-flex";

  const classes = cn(
    inter.className,
    layout,
    "items-center gap-2 rounded-lg font-semibold shadow-md",
    "transition-transform duration-200 focus:outline-none focus:ring-4 hover:scale-105",
    "cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if (as === "link") {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorRest}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(rest as ButtonAsButton)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
});

export const DeleteFormAction = (args: {
  id: number;
  variant: ButtonVariant;
  children: ReactNode;
  action: (formData: FormData) => Promise<void>;
}) => {
  return (
    <form action={args.action}>
      <input type="hidden" name="id" value={args.id} />
      <Button
        variant={args.variant}
        aria-label={`Delete this ${args.id}`}
        onClick={(e) => {
          if (!confirm("Delete this enquiry? this cannot be undone."))
            e.preventDefault();
        }}
      >
        {args.children}
      </Button>
    </form>
  );
};
