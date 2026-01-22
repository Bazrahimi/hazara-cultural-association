// app/shop/ui/shipping-details/ManualAddressToggle.tsx
"use client";
import { P } from "@/app/ui/global/paragraph";

export default function ManualAddressToggle({
  manually,
  setManually,
}: {
  manually: boolean;
  setManually: (v: boolean) => void;
}) {
  return !manually ? (
    <P
      onClick={() => setManually(true)}
      role="button"
      tabIndex={0}
      className="mt-2 cursor-pointer underline text-gray-600 hover:text-gray-800"
    >
      Or click here to enter your address manually
    </P>
  ) : (
    <P
      onClick={() => setManually(false)}
      role="button"
      tabIndex={0}
      className="mt-2 cursor-pointer underline text-gray-600 hover:text-gray-800"
    >
      Or complete your address using autocomplete
    </P>
  );
}
