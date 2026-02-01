// app/shop/cart/checkout/ui/SocialAccount.tsx
"use client";

import { Button, P } from "@/app/_ui";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";

type Provider = "facebook" | "google" | "apple";

type SocialAccountProps = {
  /** Called when a provider is clicked */
  onProviderSelect?: (provider: Provider) => void;
  /** Disable buttons while starting OAuth */
  disabled?: boolean;
};

const SocialAccount = ({ onProviderSelect, disabled }: SocialAccountProps) => {
  return (
    <div className="my-4 flex items-center justify-between gap-4 md:gap-6">
      <P className="font-medium text-gray-600">Continue with</P>
      <div className="flex gap-4 md:gap-6">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => onProviderSelect?.("facebook")}
          aria-label="Continue with Facebook"
        >
          <FaFacebook className="text-3xl" />
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => onProviderSelect?.("google")}
          aria-label="Continue with Google"
        >
          <FcGoogle className="text-3xl" />
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => onProviderSelect?.("apple")}
          aria-label="Continue with Apple"
        >
          <ImAppleinc className="text-3xl text-gray-700" />
        </Button>
      </div>
    </div>
  );
};

export default SocialAccount;
