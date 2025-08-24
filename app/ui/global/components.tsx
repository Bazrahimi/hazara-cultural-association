"use client";

import { inter, lusitana, roboto } from "@/app/lib/font";
import clsx from "clsx";
import Link from "next/link";
import React, { forwardRef, ReactNode, useMemo, useState } from "react";
import { IconType } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";

/* =========================
 * Input
 * =======================*/
type InputOption = string | { value: string; label?: string };
type InputProps = {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "password";
  defaultValue?: string;
  error?: string[];
  Icon?: IconType;
  autoComplete?: string;
  required?: boolean;
  options?: InputOption[];
  listId?: string;
};

export const Input = ({
  id,
  label,
  placeholder,
  type,
  defaultValue,
  Icon,
  error,
  autoComplete,
  required = false,
  options,
  listId
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;
  const hasError = !!error?.length;

  const describedBy = hasError ? `${id}-error` : undefined;
  const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);

  // inputMode improves mobile keyboards
  const inputMode =
    type === "email" ? "email" : type === "text" ? "text" : undefined;

  // dynamic padding if a leading Icon is present
  const leftPad = Icon ? "pl-10 sm:pl-11" : "pl-3 sm:pl-4";

    // datalist id (only if options are provided)
  const resolvedListId = options && (listId || `${id}-list`);

  // normalise options to { value, label }
  const normalisedOptions = useMemo(
    () =>
      (options ?? []).map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      ),
    [options]
  );

  return (
    <div className="mb-5" data-required={required || undefined}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden>
            *
          </span>
        )}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required} // ✅ native early check
          aria-required={required || undefined} // ✅ a11y
          inputMode={inputMode}
          autoComplete={
            autoComplete ??
            (type === "email"
              ? "email"
              : type === "password"
              ? "current-password"
              : "on")
          }
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          list={resolvedListId || undefined}
          className={clsx(
            "peer block w-full rounded-md border border-gray-200",
            "py-2 pr-10 text-sm sm:text-base outline-2 placeholder:text-gray-500",
            "focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            leftPad,
            hasError && "border-red-300 focus:border-red-400 focus:ring-red-100"
          )}
        />

        {/* Leading icon */}
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 sm:h-6 sm:w-6 peer-focus:text-gray-900"
            aria-hidden
          />
        )}

        {/* Password toggle */}
        {isPassword && (
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
        )}
      </div>

            {/* Datalist (only if options provided) */}
      {resolvedListId && normalisedOptions.length > 0 && (
        <datalist id={resolvedListId}>
          {normalisedOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label ?? o.value}
            </option>
          ))}
        </datalist>
      )}

      {/* Errors */}
      {hasError && (
        <div
          id={`${id}-error`}
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 text-right text-xs text-red-600 sm:text-sm"
        >
          {error!.map((msg, i) => (
            <p key={`${id}-error-${i}`}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================
 * Button
 * =======================*/

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

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
  primary: "bg-yellow-700 text-white hover:bg-yellow-600 focus:ring-yellow-300",
  secondary: "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-300",
  outline:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
};

const sizes: Record<ButtonSize, string> = {
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

  const classes = clsx(
    inter.className,
    layout,
    "items-center gap-2 rounded-lg font-semibold shadow-md",
    "transition-transform duration-200 focus:outline-none focus:ring-4 hover:scale-105",
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

/* =========================
 * Header (h1/h2/h3 only)
 * =======================*/

type AsTag = "h1" | "h2" | "h3";

type HeadingSize = "sm" | "md" | "lg";

type HeaderProps = {
  children: React.ReactNode;
  size?: HeadingSize;
  as: AsTag; // only headings
  align?: "left" | "center" | "right";
  color?: "brand" | "default";
  className?: string;
};

const HEADING_COLOR: Record<NonNullable<HeaderProps["color"]>, string> = {
  brand: "text-yellow-700",
  default: "text-blue-600",
};

const SCALE: Record<AsTag, Record<HeadingSize, string>> = {
  h1: {
    sm: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    md: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
    lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  },
  h2: {
    sm: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    md: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  },
  h3: {
    sm: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
    md: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    lg: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  },
};

export function Header({
  children,
  size = "md",
  as = "h1",
  align = "left",
  color = "brand",
  className,
}: HeaderProps) {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        lusitana.className,
        "mb-3 break-words font-extrabold leading-tight tracking-tight hyphens-auto",
        SCALE[as][size],
        HEADING_COLOR[color],
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
    >
      {children}
    </Tag>
  );
}

type ParaSize = "sm" | "md" | "lg";

type PProps = {
  children: React.ReactNode;
  size?: ParaSize;
  className: string;
};

const SIZE: Record<ParaSize, string> = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
};

export function P({ children, size = "md", className }: PProps) {
  return (
    <p className={clsx(roboto.className, SIZE[size], "antialiased", className)}>
      {children}
    </p>
  );
}
