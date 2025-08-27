import { lusitana } from "@/app/lib/font";
import clsx from "clsx";
import * as React from "react";

type AsTag = "h1" | "h2" | "h3";
type HeadingSize = "xs" | "sm" | "md" | "lg"; // ✅ added xs

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /** Heading content */
  children: React.ReactNode;
  /** Visual scale (responsive) */
  size?: HeadingSize;
  /** Semantic tag: use correct level for SEO/a11y hierarchy */
  as: AsTag;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Extra classes (optional). You can override the fixed color here if needed. */
  className?: string;
};

/**
 * Responsive size scales per heading tag.
 * `xs` is intentionally compact for tight layouts or small cards.
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
};

// Fixed default color (as requested)
const DEFAULT_COLOR = "text-blue-500";

export function Header({
  children,
  size = "md",
  as,
  align = "left",
  className,
  ...rest
}: HeaderProps) {
  const Tag = as;

  return (
    <Tag
      className={clsx(
        lusitana.className,
        "mb-3 break-words font-extrabold leading-tight tracking-tight hyphens-auto",
        SCALE[as][size], // responsive size
        DEFAULT_COLOR, // fixed color
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
