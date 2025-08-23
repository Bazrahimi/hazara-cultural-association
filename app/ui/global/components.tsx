import { inter, lusitana } from "@/app/lib/font";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";

type InputProps = {
  id: string;
  placeholder?: string;
  type: "text" | "email" | "password";
  defaultValue?: string;
  error?: string[];
  Icon?: IconType;
  autoComplete?: string;
};

export const Input = ({
  id,
  placeholder,
  type,
  defaultValue,
  Icon,
  error,
  autoComplete,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordToggle = type === "password";
  const inputType = showPasswordToggle && isPasswordVisible ? "text" : type;

  const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);

  // describe only when there are errors
  const describedBy = error?.length ? `${id}-error` : undefined;

  return (
    <div className="mb-5">
      {/* Label (visually hidden, still accessible) */}
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>

      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={
            autoComplete ??
            (type === "email"
              ? "email"
              : type === "password"
              ? "current-password"
              : "on")
          }
          aria-describedby={describedBy}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-10 text-sm sm:text-base outline-2 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        {/* Leading icon */}
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 h-5 w-5 sm:h-6 sm:w-6"
            aria-hidden
          />
        )}

        {/* Password toggle */}
        {showPasswordToggle && (
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

      {/* Errors */}
      {error?.length ? (
        <div
          id={`${id}-error`}
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 text-right text-xs sm:text-sm text-red-600"
        >
          {error.map((msg, i) => (
            <p key={`${id}-error-${i}`}>{msg}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

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

// const baseStyles =
//   "inline-flex items-center gap-2 rounded-lg font-semibold shadow-md transition-transform duration-200 focus:ring-4 focus:outline-none hover:scale-105";

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

export function Button(props: ButtonProps) {
  const {
    as = "button",
    children,
    icon,
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    ...rest
  } = props as ButtonProps & { fulWidth?: boolean };

  const layout = fullWidth
    ? "flex w-full justify-center" // block-level, takes full width, centers content
    : "inline-flex"; // default inline sizing

  const classes = clsx(
    inter.className,
    layout, // <--- use computed layout
    "items-center gap-2 rounded-lg font-semibold shadow-md transition-transform duration-200 focus:ring-4 focus:outline-none hover:scale-105",
    variants[variant],
    sizes[size],
    className
  );

  if (as === "link") {
    const { href, ...anchorRest } = rest as ButtonAsLink; // <-- strip href before spread
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

type HeaderProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  as?: "h1" | "h2" | "h3" | "p" | "div";
  align?: "left" | "center" | "right";
  color?: "brand" | "default";
  className?: string;
};

const SIZE = {
  sm: "text-xl sm:text-2xl md:text-3xl",
  md: "text-2xl sm:text-3xl md:text-4xl", // <- your original scale
  lg: "text-3xl sm:text-4xl md:text-5xl",
};

const COLOR = {
  brand: "text-yellow-700",
  default: "text-blue-600",
};

export default function Header({
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
        "mb-3 font-bold leading-tight",
        SIZE[size],
        COLOR[color],
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
