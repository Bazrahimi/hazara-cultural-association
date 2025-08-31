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

  useEffect(() => {
    const v = localStorage.getItem("checkoutEmail");
    if (v) setCheckoutEmail(v);
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
    setActiveMethod("guest"); // jump to the email form again
  };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <div>
        <Header as="h1">Checkout</Header>

        <P className="mt-1">
          Review your order and choose how you’d like to continue.
        </P>
      </div>

      <Header as="h2" size="sm">
        Email
      </Header>
      {/* If email exists, show “Email” summary like your screenshot */}
      {checkoutEmail && (
        <section className="rounded-md border border-gray-200 px-4 py-5">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditEmail}
              aria-label="Edit email"
            >
              Edit
            </Button>
          </div>
          <P className="mt-2 text-gray-600">
            You are ordering as:{" "}
            <span className="font-semibold">{checkoutEmail}</span>
          </P>
        </section>
      )}

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        {/* RIGHT: Methods panel — hide it if we already have an email */}

        <aside className="space-y-6">
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

              <div className="space-y-3">
                {(!activeMethod || activeMethod === "guest") && (
                  <GuestCheckout
                    setActiveMethod={setActiveMethod}
                    // NEW: update page state when email is saved
                    onEmailSaved={(email) => setCheckoutEmail(email)}
                  />
                )}

                {/* These are already hidden when activeMethod === "guest" */}
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
          <div className="flex justify-between">
            <Header as="h2" size="sm">
              Shipping Details
            </Header>
            {checkoutEmail && hideShipping && (
              <Button
                variant="outline"
                onClick={() => setHideShipping(false)}
                size="sm"
              >
                Edit
              </Button>
            )}
          </div>

          {checkoutEmail &&
            (hideShipping ? (
              <section className="mt-4 rounded-md border border-gray-200 p-4 space-y-2">
                <p>
                  <span className="font-semibold">Name: </span>
                  {summaryContact.firstName} {summaryContact.lastName}
                </p>
                <p>
                  <span className="font-semibold">Contact: </span>
                  {summaryContact.phone}
                </p>
                <p>
                  <span className="font-semibold">Address: </span>
                  {postalLabelFromFull(summaryAddress)}
                  {summaryAddress.address2
                    ? `, ${summaryAddress.address2}`
                    : ""}
                </p>
              </section>
            ) : (
              <ShippingDetails onContinue={handleShippingContinue} />
            ))}
        </aside>

        {/* LEFT: Order Summary */}
        <OrderSummary />
      </div>
    </div>
  );
}
