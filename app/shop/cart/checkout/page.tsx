"use client";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { useEffect, useState } from "react";
import GuestCheckout from "./ui/GuestCheckout";
import OrderSummary from "./ui/OrderSummary";
import ShippingDetails from "./ui/ShippingDetails";
import SocialAccount from "./ui/SocialAccount";

export default function CheckoutPage() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  // NEW: hold saved email (hydrated from localStorage)
  const [checkoutEmail, setCheckoutEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem("checkoutEmail");
      if (v) setCheckoutEmail(v);
    } catch {}
  }, []);

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
          <Header as="h2" size="sm">
            Shipping Address
          </Header>
          {checkoutEmail && (
            <>
              <ShippingDetails />
            </>
          )}
        </aside>

        {/* LEFT: Order Summary */}
        <OrderSummary />
      </div>
    </div>
  );
}
