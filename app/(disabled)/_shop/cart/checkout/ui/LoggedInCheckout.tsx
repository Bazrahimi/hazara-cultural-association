// app/_shop/cart/checkout/ui/LoggedInCheckout.tsx
"use client";

import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useState } from "react";

import CheckoutPayForm from "./CheckoutPayForm";
import OrderSummary from "./OrderSummary";
import ShippingDetails from "./ShippingDetails";
import StepCard from "./StepCard";

import type {
  Contact,
  FullAddress,
} from "@/app/(disabled)/_shop/lib/definitions";
import {
  ADDRESS_KEY,
  CONTACT_KEY,
  emptyAddress,
  isAddressComplete,
  postalLabelFromFull,
} from "@/app/(disabled)/_shop/lib/helper";

type Props = {
  userId: number;
  email: string;
  profile: { firstName: string; lastName: string; phone: string };
  defaultAddress: (FullAddress & { id: number; label?: string }) | null; // ← allow null
};

type Step = "shipping" | "pay";

export default function LoggedInCheckout({
  email,
  profile,
  defaultAddress,
}: Props) {
  const [currentStep, setCurrentStep] = useState<Step>("shipping");

  // Start from profile/default address if available; allow user edits via ShippingDetails
  const [summaryAddress, setSummaryAddress] = useState<FullAddress>(
    defaultAddress ?? emptyAddress,
  );
  const [summaryContact, setSummaryContact] = useState<Contact>({
    fullName: [profile.firstName, profile.lastName].filter(Boolean).join(" "),
    phone: profile.phone || "",
  });

  // Load any local edits (if user previously changed in this browser)
  useEffect(() => {
    try {
      const rawA = localStorage.getItem(ADDRESS_KEY);
      if (rawA) {
        const a = JSON.parse(rawA) as Partial<FullAddress>;
        setSummaryAddress((prev) => ({ ...prev, ...a }));
      }
      const rawC = localStorage.getItem(CONTACT_KEY);
      if (rawC) {
        const c = JSON.parse(rawC) as Partial<Contact>;
        setSummaryContact((prev) => ({ ...prev, ...c }));
      }
    } catch {}
  }, []);

  const onShippingContinue = () => {
    try {
      const rawA = localStorage.getItem(ADDRESS_KEY);
      const rawC = localStorage.getItem(CONTACT_KEY);
      if (rawA) setSummaryAddress(JSON.parse(rawA));
      if (rawC) setSummaryContact(JSON.parse(rawC));
    } catch {}
    setCurrentStep("pay");
  };

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-8">
      <header>
        <Header as="h1">Checkout</Header>
        <P className="mt-1">You’re signed in. Confirm shipping and pay.</P>
        <P className="mt-1 text-sm text-gray-600">Ordering as: {email}</P>
      </header>

      {/* Mobile summary */}
      <section className="md:hidden">
        <Header as="h2" size="sm">
          Order Summary
        </Header>
        <OrderSummary />
      </section>

      <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-start">
        {/* LEFT */}
        <div className="space-y-5">
          {/* Shipping */}
          <StepCard
            title="Shipping Details"
            expanded={currentStep === "shipping"}
            onEdit={() => setCurrentStep("shipping")}
            canEdit={isAddressComplete(summaryAddress)}
            summary={
              isAddressComplete(summaryAddress) ? (
                <div className="space-y-1 text-sm">
                  <p className="mb-0">
                    <span className="font-semibold">Name: </span>
                    {summaryContact.fullName || "—"}
                  </p>
                  <p className="mb-0">
                    <span className="font-semibold">Contact: </span>
                    {summaryContact.phone || "—"}
                  </p>
                  <p className="mb-0">
                    <span className="font-semibold">Address: </span>
                    {postalLabelFromFull(summaryAddress)}
                    {summaryAddress.address2
                      ? `, ${summaryAddress.address2}`
                      : ""}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No shipping address yet.</p>
              )
            }
          >
            <ShippingDetails onContinue={onShippingContinue} />
            {/* If the default address was empty, ShippingDetails lets them fill it,
                and we’ll pick it from localStorage on Continue. */}
            {isAddressComplete(summaryAddress) && (
              <div className="mt-3">
                <Button onClick={onShippingContinue}>Use this address</Button>
              </div>
            )}
          </StepCard>

          {/* Payment */}
          <section className="space-y-1">
            <Header as="h2" size="sm">
              Proceed with Payment
            </Header>
            {isAddressComplete(summaryAddress) && (
              <CheckoutPayForm
                email={email}
                contact={summaryContact}
                address={summaryAddress}
              />
            )}
            {!isAddressComplete(summaryAddress) && (
              <P className="text-gray-500">Please complete shipping first.</P>
            )}
          </section>
        </div>

        {/* RIGHT */}
        <aside className="hidden md:block self-start">
          <div className="sticky top-0">
            <OrderSummary />
          </div>
        </aside>
      </div>
    </div>
  );
}
