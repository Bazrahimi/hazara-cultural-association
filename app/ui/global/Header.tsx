import { lusitana } from "@/app/lib/font";
import clsx from "clsx";
import * as React from "react";

type AsTag = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "xs" | "sm" | "md" | "lg";

// You can pass one of these tokens OR any Tailwind text color class string.
const COLORS = {
  brand: "text-blue-500",
  slate: "text-slate-900",
  muted: "text-gray-700",
  info: "text-sky-600",
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
  white: "text-white",
} as const;

type HeaderColor = keyof typeof COLORS | string;

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /** Heading content */
  children: React.ReactNode;
  /** Visual scale (responsive) */
  size?: HeadingSize;
  /** Semantic tag: use correct level for SEO/a11y hierarchy */
  as: AsTag;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Color override: pass a token (e.g. "brand", "danger") or a Tailwind class (e.g. "text-red-600") */
  color?: HeaderColor;
  /** Extra classes (optional). Last one wins if you also override color here. */
  className?: string;
};

/**
 * Responsive size scales per heading tag.
 * `xs` is intentionally compact for tight layouts or small cards.
 * h4 is one step smaller than h3 across breakpoints.
 */
const SCALE: Record<AsTag, Record<HeadingSize, string>> = {
  h1: {
    xs: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    sm: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    md: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
    lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  },
  h2: {
    xs: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
    sm: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    md: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  },
  h3: {
    xs: "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
    sm: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
    md: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    lg: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  },
  h4: {
    xs: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
    sm: "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
    md: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
    lg: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  },
};

const DEFAULT_COLOR = "text-blue-500";

export function Header({
  children,
  size = "md",
  as,
  align = "left",
  color,         // ← new prop
  className,
  ...rest
}: HeaderProps) {
  const Tag = as;

  // Resolve color: token → mapped class, raw string → use as-is, undefined → default
  const resolvedColor =
    typeof color === "string"
      ? (color in COLORS ? (COLORS as any)[color] : color)
      : DEFAULT_COLOR;

  return (
    <Tag
      className={clsx(
        lusitana.className,
        "mb-3 break-words font-extrabold leading-tight tracking-tight hyphens-auto",
        SCALE[as][size],
        resolvedColor, // use resolved color class
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className // last wins if you want to override color here too
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
