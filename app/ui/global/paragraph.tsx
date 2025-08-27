import { roboto } from "@/app/lib/font";
import clsx from "clsx";
import * as React from "react";

type ParaSize = "sm" | "md" | "lg";

type PProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
  size?: ParaSize;
  className?: string; // ✅ optional now
};

/**
 * Responsive sizes tuned for paragraph text (not headings).
 * - sm: slightly smaller on mobile, normal on larger screens
 * - md: good default paragraph size
 * - lg: larger body copy for emphasis/lead sections
 */
const SIZE: Record<ParaSize, string> = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
};

/**
 * Matching line-heights for comfortable reading at each size.
 * Slightly looser leading improves legibility for longer text.
 */
const LEADING: Record<ParaSize, string> = {
  sm: "leading-6 sm:leading-7",
  md: "leading-7 sm:leading-8",
  lg: "leading-8 sm:leading-9",
};

export function P({ children, size = "md", className, ...rest }: PProps) {
  return (
    <p
      className={clsx(
        roboto.className, // ✅ Roboto for clear reading
        SIZE[size], // ✅ responsive font-size
        LEADING[size], // ✅ matching line-height
        "antialiased", // smooth edges
        "text-gray-500", // high-contrast but not pure black
        "break-words", // prevent overflow on long URLs/words
        // "text-pretty",            // (optional if you're on Tailwind 3.3+) nicer wraps
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
