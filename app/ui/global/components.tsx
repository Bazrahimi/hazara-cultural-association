"use client";

import { inter, lusitana, roboto } from "@/app/lib/font";
import clsx from "clsx";
import Link from "next/link";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconType } from "react-icons";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";

/* =========================
 * Input
 * =======================*/
export type BaseInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "password";
  /** Controlled or uncontrolled */
  value?: string;
  onChange?: (v: string) => void;
  defaultValue?: string;

  error?: string[];
  Icon?: IconType;
  required?: boolean;
  autoComplete?: string;
  inputClassName?: string;

  /** Extra props to apply to the underlying <input> (handlers/ARIA, etc.) */
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
    },
    ref
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && isPasswordVisible ? "text" : type;

    const hasError = !!error?.length;

    const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);

    const inputMode =
      type === "email" ? "email" : type === "text" ? "text" : undefined;

    const leftPad = Icon ? "pl-10 sm:pl-11" : "pl-3 sm:pl-4";

    const common = {
      id,
      name: id,
      type: inputType,
      placeholder,
      required,
      "aria-required": required || undefined,
      inputMode,
      autoComplete:
        autoComplete ?? (type === "password" ? "current-password" : "off"),
      className: clsx(
        "peer block w-full rounded-md border border-gray-200",
        "py-2 pr-10 text-sm sm:text-base outline-2 placeholder:text-gray-500",
        "focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
        leftPad,
        hasError && "border-red-300 focus:border-red-400 focus:ring-red-100",
        inputClassName
      ),
      ...inputProps, // allow handlers/ARIA from parent
    } as const;

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
          {value !== undefined ? (
            <input
              {...common}
              ref={ref}
              value={value}
              onChange={(e) => onChange?.(e.currentTarget.value)}
            />
          ) : (
            <input {...common} ref={ref} defaultValue={defaultValue} />
          )}

          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 sm:h-6 sm:w-6 peer-focus:text-gray-900"
              aria-hidden
            />
          )}

          {isPassword ? (
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
          ) : /* render any custom end adornment (e.g., clear button) */
          endAdornment ? (
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
            className="mt-2 text-right text-xs text-red-600 sm:text-sm"
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

type Props = Omit<BaseInputProps, "type" | "inputProps"> & {
  options: readonly InputOption[];
  type?: "text";
  mustMatch?: boolean;
  /** Max items to render in the dropdown */
  maxItems?: number;
  onOptionSelect?: (opt: { value: string; label: string }) => void;
  clearable?: boolean;
};

export function InputAutocomplete({
  id,
  label,
  placeholder,
  value,
  onChange,
  defaultValue,
  Icon,
  error,
  required,
  autoComplete = "off",
  options,
  type = "text",
  mustMatch = false,
  maxItems,
  onOptionSelect,
  clearable = true,
}: Props) {
  // controlled/uncontrolled
  const [internal, setInternal] = useState(defaultValue ?? "");
  const val = value ?? internal;
  const setVal = (next: string) =>
    onChange ? onChange(next) : setInternal(next);

  // dropdown
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ids
  const uid = useId();
  const listboxId = `${id}-listbox-${uid}`;
  const optionId = (i: number) => `${listboxId}-opt-${i}`;

  // normalise options
  const normalised = useMemo(
    () =>
      options.map((o) =>
        typeof o === "string"
          ? { value: o, label: o }
          : { value: o.value, label: o.label ?? o.value }
      ),
    [options]
  );

  // filter
  const filtered = useMemo(() => {
    const q = val.trim().toLowerCase();
    const base = q
      ? normalised.filter((o) => o.label.toLowerCase().includes(q))
      : normalised;
    return base.slice(0, maxItems);
  }, [normalised, val, maxItems]);

  // keep active in view
  useEffect(() => {
    if (!open || highlight < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `#${optionId(highlight)}`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  // outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selectIndex = (i: number) => {
    const item = filtered[i];
    if (!item) return;
    setVal(item.value);
    onOptionSelect?.(item);
    setOpen(false);
    setHighlight(i);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (!mustMatch) return;
    const matched = normalised.find((o) => o.value === val || o.label === val);
    if (!matched) {
      setVal("");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      setHighlight(0);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(filtered.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlight(Math.max(0, filtered.length - 1));
    } else if (e.key === "Enter") {
      if (highlight >= 0) {
        e.preventDefault();
        selectIndex(highlight);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setHighlight(-1);
    }
  };

  const clearBtn =
    clearable && !!val ? (
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          setVal("");
          setOpen(true);
          setHighlight(-1);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="text-gray-400 hover:text-gray-700 focus:outline-none"
        aria-label="Clear"
        title="Clear"
      >
        <IoClose className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    ) : null;

  return (
    <div className="relative" ref={rootRef}>
      <Input
        ref={inputRef}
        id={id}
        label={label}
        placeholder={placeholder}
        type={type}
        value={val}
        onChange={(next) => {
          setVal(next);
          setOpen(true);
          setHighlight(-1);
        }}
        Icon={Icon}
        error={error}
        required={required}
        autoComplete={autoComplete}
        inputProps={{
          role: "combobox",
          "aria-expanded": open,
          "aria-controls": listboxId,
          "aria-autocomplete": "list",
          "aria-activedescendant":
            open && highlight >= 0 ? optionId(highlight) : undefined,
          onFocus: () => setOpen(true),
          onBlur: handleBlur,
          onKeyDown: handleKeyDown,
        }}
        inputClassName={open ? "rounded-b-none border-b-0" : undefined}
        endAdornment={clearBtn}
      />

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className={clsx(
            // anchor to the input
            "absolute left-0 top-full z-10 w-full",
            // remove the little gap & merge borders
            " border border-gray-200 border-t-0",
            // blend corners with input
            "rounded-b-md rounded-t-none",
            // surface
            "bg-gray-100 shadow-lg max-h-64 overflow-auto"
          )}
        >
          {filtered.length === 0 ? (
            <li
              className="cursor-default px-3 py-2 text-sm text-gray-500"
              aria-disabled="true"
            >
              No matches
            </li>
          ) : (
            filtered.map((o, i) => (
              <li
                key={`${o.value}-${i}`}
                id={optionId(i)}
                role="option"
                aria-selected={i === highlight}
                className={clsx(
                  "cursor-pointer select-none px-3 py-2 text-sm",
                  i === highlight
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-800 hover:bg-gray-50"
                )}
                onMouseDown={(e) => e.preventDefault()} // prevent blur
                onMouseEnter={() => setHighlight(i)}
                onClick={() => selectIndex(i)}
              >
                {o.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

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
