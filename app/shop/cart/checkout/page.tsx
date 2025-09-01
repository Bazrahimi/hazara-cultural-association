// app/shop/ui/CheckoutPage.tsx
"use client";

import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useState } from "react";

import type { Contact, FullAddress } from "../../lib/definitions";
import {
  ADDRESS_KEY,
  CONTACT_KEY,
  emptyAddress,
  emptyContact,
  isNonEmpty,
  isPostcode,
  postalLabelFromFull,
} from "../../lib/helper";

import GuestCheckout from "./ui/GuestCheckout";
import OrderSummary from "./ui/OrderSummary";
import ShippingDetails from "./ui/ShippingDetails";
import SocialAccount from "./ui/SocialAccount";

export default function CheckoutPage() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState<string | null>(null);
  const [summaryAddress, setSummaryAddress] =
    useState<FullAddress>(emptyAddress);
  const [summaryContact, setSummaryContact] = useState<Contact>(emptyContact);
  const [hideShipping, setHideShipping] = useState(false);

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
    setActiveMethod("guest");
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

      {/* Mobile-only Order Summary at the very top */}
      <section className="md:hidden">
        <Header as="h2" size="sm">
          Order Summary
        </Header>
        <OrderSummary />
      </section>

      {/* Main layout: left = methods + shipping, right = sticky summary */}
      <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-start">
        {/* EMAIL (spans both columns on md+) */}
        <div className="md:col-span-1 space-y-5">
          <section className="space-y-1">
            <div className="flex items-center justify-between">
              <Header as="h2" size="sm">
                Email
              </Header>
              {checkoutEmail && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEditEmail}
                  aria-label="Edit email"
                >
                  Edit
                </Button>
              )}
            </div>

            {checkoutEmail && (
              <div className="rounded-md border border-gray-200 px-4 py-5">
                <P className="text-gray-600">
                  You are ordering as:{" "}
                  <span className="font-semibold">{checkoutEmail}</span>
                </P>
              </div>
            )}
          </section>

          {/* LEFT: shipping */}
          <section className="space-y-1">
            {/* Methods panel (hide if email already chosen) */}
            {!checkoutEmail && (
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
                      onEmailSaved={(email) => setCheckoutEmail(email)}
                    />
                  )}

                  {!activeMethod && (
                    <>
                      <SocialAccount />
                      <Button variant="outline" fullWidth>
                        Continue with Email
                      </Button>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Shipping details (only visible once email is chosen) */}
            <div className="flex items-center justify-between">
              <Header as="h2" size="sm">
                Shipping Details
              </Header>
              {checkoutEmail && hideShipping && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHideShipping(false)}
                >
                  Edit
                </Button>
              )}
            </div>

            {checkoutEmail &&
              (hideShipping ? (
                <section className="rounded-md border border-gray-200 p-4 space-y-2">
                  <P>
                    <span className="font-semibold">Name: </span>
                    {summaryContact.firstName} {summaryContact.lastName}
                  </P>
                  <P>
                    <span className="font-semibold">Contact: </span>
                    {summaryContact.phone}
                  </P>
                  <P>
                    <span className="font-semibold">Address: </span>
                    {postalLabelFromFull(summaryAddress)}
                    {summaryAddress.address2
                      ? `, ${summaryAddress.address2}`
                      : ""}
                  </P>
                </section>
              ) : (
                <ShippingDetails onContinue={handleShippingContinue} />
              ))}
          </section>

          <section className="space-y-1">
            <div >
              <Header as="h2" size="sm">
                Proceed with Payment
              </Header>
              {checkoutEmail && (
                hideShipping && (
                  <Button fullWidth>
                    Pay
                  </Button>
                )
              )}
            </div>
          </section>
        </div>
        {/* RIGHT: desktop sticky Order Summary */}
        <aside className="hidden md:block self-start">
          <div className="sticky top-0">
            <OrderSummary />
          </div>
        </aside>
      </div>
    </div>
  );
}
