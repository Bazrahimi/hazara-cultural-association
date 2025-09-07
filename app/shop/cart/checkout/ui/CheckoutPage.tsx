// app/shop/ui/CheckoutPage.tsx
"use client";

import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useState } from "react";
import type { Contact, FullAddress } from "../../../lib/definitions";
import {
  ADDRESS_KEY,
  CONTACT_KEY,
  emptyAddress,
  emptyContact,
  isAddressComplete,
  isNonEmpty,
  isPostcode,
  postalLabelFromFull,
} from "../../../lib/helper";

import CheckoutPayForm from "./CheckoutPayForm";
import GuestCheckout from "./GuestCheckout";
import OrderSummary from "./OrderSummary";
import ShippingDetails from "./ShippingDetails";
import SocialAccount from "./SocialAccount";
import StepCard from "./StepCard";

type Step = "email" | "shipping" | "pay";

export default function CheckoutPage() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState<string | null>(null);
  const [summaryAddress, setSummaryAddress] =
    useState<FullAddress>(emptyAddress);
  const [summaryContact, setSummaryContact] = useState<Contact>(emptyContact);
  const [hideShipping, setHideShipping] = useState(false);

  const [currentStep, setCurrentStep] = useState<Step>("email");

  // Hydrate shipping summary + decide whether to hide shipping form
  useEffect(() => {
    try {
      const rawA = localStorage.getItem(ADDRESS_KEY);
      const rawC = localStorage.getItem(CONTACT_KEY);

      const a = rawA
        ? { ...emptyAddress, ...(JSON.parse(rawA) as Partial<FullAddress>) }
        : emptyAddress;
      const c = rawC
        ? { ...emptyContact, ...(JSON.parse(rawC) as Partial<Contact>) }
        : emptyContact;

      setSummaryAddress(a);
      setSummaryContact(c);

      const stateLike = (a.stateCode || a.state || "").trim();
      const addressComplete =
        isNonEmpty(a.address) &&
        isNonEmpty(a.suburb) &&
        isNonEmpty(stateLike) &&
        isPostcode(a.postcode);

      if (addressComplete) setHideShipping(true);
    } catch {}
  }, []);

  // Hydrate email
  useEffect(() => {
    try {
      const v = localStorage.getItem("checkoutEmail");
      if (v) setCheckoutEmail(v);
    } catch {}
  }, []);

  const handleShippingContinue = () => {
    try {
      const rawA = localStorage.getItem(ADDRESS_KEY);
      const rawC = localStorage.getItem(CONTACT_KEY);
      if (rawA) setSummaryAddress(JSON.parse(rawA));
      if (rawC) setSummaryContact(JSON.parse(rawC));
    } catch {}
    setHideShipping(true);
  };

  const onEditEmail = () => {
    try {
      localStorage.removeItem("checkoutEmail");
    } catch {}
    setCheckoutEmail(null);
    setActiveMethod(null);
    setCurrentStep("email");
  };

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-8">
      {/* Page heading */}
      <header>
        <Header as="h1">Checkout</Header>
        <P className="mt-1">
          Review your order and choose how you’d like to continue.
        </P>
      </header>

      {/* Mobile-only Order Summary at the top */}
      <section className="md:hidden">
        <Header as="h2" size="sm">
          Order Summary
        </Header>
        <OrderSummary />
      </section>

      {/* Main layout */}
      <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-start">
        {/* LEFT column */}
        <div className="space-y-5">
          {/* Step 1: Email */}

          <StepCard
            title="Email"
            expanded={currentStep === "email"}
            onEdit={onEditEmail} // <- clears stored email & reopens the form
            canEdit={!!checkoutEmail} // <- only show Edit when we have an email
            summary={
              checkoutEmail ? (
                <P className="mb-0">
                  You are ordering as:{" "}
                  <span className="font-semibold">{checkoutEmail}</span>
                </P>
              ) : (
                <P className="text-gray-500">No email provided yet.</P>
              )
            }
          >
            {!checkoutEmail ? (
              // METHODS PANEL (same content/structure as your original snippet)
              <section
                aria-labelledby="how-to-continue"
                className="rounded-md border border-gray-200 p-4"
              >
                <Header
                  as="h3"
                  size="xs"
                  id="how-to-continue"
                  className="text-gray-600"
                >
                  Your preferred methods to checkout
                </Header>

                <div className="mt-3 space-y-3">
                  {(!activeMethod || activeMethod === "guest") && (
                    <GuestCheckout
                      setActiveMethod={setActiveMethod}
                      onEmailSaved={(email) => {
                        setCheckoutEmail(email);
                        setCurrentStep("shipping"); // advance to step 2
                      }}
                    />
                  )}

                  {!activeMethod && (
                    <>
                      <SocialAccount
                        onProviderSelect={(provider) => {
                          console.log(provider)
                          // start your OAuth flow here (e.g., next-auth signIn(provider))
                          // signIn(provider)
                        }}
                      />
                      <Button
                        variant="outline"
                        fullWidth
                        type="button"
                        onClick={() => setActiveMethod("guest")}
                      >
                        Continue with Email
                      </Button>
                    </>
                  )}
                </div>
              </section>
            ) : (
              // WHEN EMAIL EXISTS & STEP IS OPEN
              <div className="rounded-md border border-gray-200 px-4 py-4">
                <P className="text-gray-700 mb-0">
                  You are ordering as:{" "}
                  <span className="font-semibold">{checkoutEmail}</span>
                </P>
                <div className="mt-3">
                  <Button onClick={() => setCurrentStep("shipping")}>
                    Continue to Shipping
                  </Button>
                </div>
              </div>
            )}
          </StepCard>

          <StepCard
            title="Shipping Details"
            expanded={currentStep === "shipping"}
            onEdit={() => setCurrentStep("shipping")}
            canEdit={isAddressComplete(summaryAddress)} // hide Edit until it’s complete
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
            <ShippingDetails
              onContinue={() => {
                // persist, update your summary state as you already do…
                handleShippingContinue();
                // then jump to next step
                setCurrentStep("pay");
              }}
            />
          </StepCard>

          {/* Payment */}
          <section className="space-y-1">
            <Header as="h2" size="sm">
              Proceed with Payment
            </Header>
            {checkoutEmail && hideShipping && (
              <CheckoutPayForm
                email={checkoutEmail}
                contact={summaryContact}
                address={summaryAddress}
                // disabled={!canPay}
              />
            )}
          </section>
        </div>

        {/* RIGHT column: sticky order summary */}
        <aside className="hidden md:block self-start">
          <div className="sticky top-0">
            <OrderSummary />
          </div>
        </aside>
      </div>
    </div>
  );
}
