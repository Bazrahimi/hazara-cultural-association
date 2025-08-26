"use client";
import { Button } from "@/app/ui/global/components";
import { useActionState, useState } from "react";
import { submitDonation } from "../lib/action";
import DonationAmount, { DonateTab } from "./form/DonationAmount";
import DonationDetails from "./form/DonationDetails";

import { DonationState } from "../lib/definitions";

const nowAmount = [50, 100, 250, 500];
const regularAmount = [20, 50, 100, 250];
type Step = "amount" | "details";

const initialState: DonationState = { ok: false };

export default function DonateForm() {
  const [tab, setTab] = useState<DonateTab>("once");
  const [amount, setAmount] = useState<number | "">("");
  const [amountError, setAmountError] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("amount");

  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address1: "",
    address2: "",
    suburb: "",
    state: "" as
      | ""
      | "VIC"
      | "NSW"
      | "QLD"
      | "SA"
      | "WA"
      | "TAS"
      | "ACT"
      | "NT",
    postCode: "",
    payByCard: true, // maps to creditCard
  });

  const [state, formAction, isPending] = useActionState(
    submitDonation,
    initialState
  );

  const handleTabChange = (t: DonateTab) => {
    setAmountError(false);
    setTab(t);
    setAmount("");
  };

  const updateDetails = <K extends keyof typeof details>(
    field: K,
    value: (typeof details)[K]
  ) => setDetails((d) => ({ ...d, [field]: value }));

  // Step 1 → Step 2 transition
  const goToDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (amount === "" || Number(amount) <= 10) {
      setAmountError(true);
      return;
    }
    setStep("details");
  };

  const isAmountStep = step === "amount";

  // Combine address lines for server (schema expects a single "address")
  const combinedAddress =
    details.address1 + (details.address2 ? `, ${details.address2}` : "");

  return (
    <form
      action={formAction}
      className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Optional success/error banner */}

      {isAmountStep ? (
        <>
          <DonationAmount
            tab={tab}
            onTabChange={handleTabChange}
            amount={amount}
            setAmount={setAmount}
            nowAmount={nowAmount}
            regularAmount={regularAmount}
            // If you want to show server error for amount back on step 1:
            // error={state?.errors?.amount}
          />
          {amountError && (
            <p className="text-red-500 text-sm">
              Minimum Donate amount is $10.00
            </p>
          )}
        </>
      ) : (
        <>
          {/* Hidden fields needed on submit */}
          <input
            type="hidden"
            name="amount"
            value={amount === "" ? "" : amount}
          />
          <input type="hidden" name="address" value={combinedAddress} />

          <DonationDetails
            details={details}
            onChange={updateDetails}
            onBack={() => setStep("amount")}
            // You can pass field errors to show under inputs, e.g.:
            // errors={state?.errors}
          />

          {/* Map details to the names your server expects */}
          {/* If your DonationDetails uses <Input id="..."> it already uses name=id. Ensure these ids: 
              fullName, email, contactNumber, suburb, state, postCode.
              For the credit card checkbox, use name="creditCard".
          */}
        </>
      )}

      {isAmountStep ? (
        <Button
          type="button"
          onClick={(e) => goToDetails(e)}
          fullWidth
          className="text-center"
        >
          Donate Now
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isPending}
          fullWidth
          className="text-center"
        >
          {isPending
            ? "Processing..."
            : tab === "once" ? `Donate Now ($${amount})` : `Donate Regularly ($${amount})`}
        </Button>
      )}

      {state?.message && (
        <div
          className={`mb-4 rounded-md p-3 text-sm ${
            state.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <p className="mt-3 text-xs text-gray-500">
        Every dollar you give goes back to the community.
      </p>
    </form>
  );
}
