"use client";

import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";

type Props = {
  /** extra classes, e.g. "mt-4" */
  className?: string;
  /** Leading text before the links */
  prefix?: string;
};

const TermsAndPrivacyNotice = ({
  className = "",
  prefix = "By creating an account, you agree to our",
}: Props) => {
  return (
    <P className={`text-center text-xs text-gray-600 ${className}`}>
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
