"use client";

import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";

type TextSize = "xs" | "sm" | "base";

type Props = {
  /** extra classes, e.g. "mt-4" */
  className?: string;
  /** Leading text before the links */
  prefix?: string;
  /** text size for the notice */
  size?: TextSize;
};

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
};

const TermsAndPrivacyNotice = ({
  className = "",
  prefix = "By creating an account, you agree to our",
  size = "xs", // default stays xs
}: Props) => {
  return (
    <P
      className={`${sizeClasses[size]} text-center text-gray-600 ${className}`}
    >
      {prefix}{" "}
      <Link
        href="/terms-of-service"
        className="underline underline-offset-2 hover:text-gray-900"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-policy"
        className="underline underline-offset-2 hover:text-gray-900"
      >
        Privacy Policy
      </Link>
      .
    </P>
  );
};

export default TermsAndPrivacyNotice;
