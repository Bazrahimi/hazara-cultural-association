import { lusitana } from "@/app/lib/font";
import clsx from "clsx";
import * as React from "react";

type AsTag = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "xs" | "sm" | "md" | "lg";

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  as: AsTag; // semantic level
  size?: HeadingSize; // responsive scale
  align?: "left" | "center" | "right"; // text alignment
  className?: string; // optional overrides
};

/** Responsive scales per heading tag */
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
  className,
  ...rest
}: HeaderProps) {
  const Tag = as;

  return (
    <Tag
      className={clsx(
        lusitana.className,
        "mb-3 break-words font-extrabold leading-tight tracking-tight hyphens-auto",
        SCALE[as][size],
        DEFAULT_COLOR, // fixed color
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right"
            : "text-left",
        className // you can still override color with className e.g. "text-black"
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
