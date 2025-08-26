"use client";
import { Button } from "@/app/ui/global/components";
import { useState } from "react";
import DonationAmount, { DonateTab } from "./form/DonationAmount";
import DonationDetails from "./form/DonationDetails";

const nowAmount = [50, 100, 250, 500];
const regularAmount = [20, 50, 100, 250];
type Step = "amount" | "details";

export default function DonateForm() {
  const [tab, setTab] = useState<DonateTab>("once");
  const [amount, setAmount] = useState<number | "">("");
  const [step, setStep] = useState<Step>("amount");

  const [details, setDetails] = useState({
  fullName: "",
  email: "",
  contactNumber: "",
  // split address:
  address1: "",
  address2: "",
  suburb: "",      // suburb / city
  state: "" as "" | "VIC" | "NSW" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT",
  postcode: "",
  payByCard: true,
});

  const handleTabChange = (t: DonateTab) => {
    setTab(t);
    setAmount("");
  };

  const updateDetails = <K extends keyof typeof details>(field: K, value: (typeof details)[K]) => {
    setDetails((d) => ({ ...d, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "amount") {
      if (amount === "" || Number(amount) <= 0) {
        alert("Please choose or enter a valid amount.");
        return;
      }
      // If amount > $10, go to details step; else proceed immediately (adjust as you like)
      if (typeof amount === "number" && amount > 10) {
        setStep("details");
        return;
      }
      alert(`Donating ${amount} AUD (${tab === "once" ? "Now" : "Regularly"})`);
      // TODO: trigger payment for <= $10 flow
      return;
    }

    // step === "details": basic validation then "donate"
    if (!details.fullName || !details.email) {
      alert("Please fill your full name and email.");
      return;
    }

    alert(
      [
        `Donating ${amount} AUD (${tab === "once" ? "Now" : "Regularly"})`,
        `Name: ${details.fullName}`,
        `Email: ${details.email}`,
        `Phone: ${details.contactNumber || "-"}`,
        `Address: ${details.address || "-"}`,
        `Pay by card: ${details.payByCard ? "Yes" : "No"}`,
      ].join("\n")
    );
    // TODO: hand off to your payment intent / Stripe checkout here
  };

  const isAmountStep = step === "amount";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {isAmountStep ? (
        <DonationAmount
          tab={tab}
          onTabChange={handleTabChange}
          amount={amount}
          setAmount={setAmount}
          nowAmount={nowAmount}
          regularAmount={regularAmount}
        />
      ) : (
        <DonationDetails
          details={details}
          onChange={updateDetails}
          onBack={() => setStep("amount")}
        />
      )}

      <Button type="submit" fullWidth className="text-center">
        {isAmountStep ? "Continue" : `Donate ${tab === "once" ? "Now" : "Regularly"}`}
      </Button>

      <p className="mt-3 text-xs text-gray-500">
        Every dollar you give goes back to the community.
      </p>
    </form>
  );
}