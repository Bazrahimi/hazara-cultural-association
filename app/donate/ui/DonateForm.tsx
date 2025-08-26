"use client";
import { Button } from "@/app/ui/global/components";
import { useActionState, useState } from "react";
import { submitDonation } from "../lib/action";
import DonationAmount, { type DonateTab } from "./form/DonationAmount";
import DonationDetails from "./form/DonationDetails";

const nowAmount = [50, 100, 250, 500];
const regularAmount = [20, 50, 100, 250];
type Step = "amount" | "details";

export default function DonateForm() {
  const [tab, setTab] = useState<DonateTab>("once");
  const [amount, setAmount] = useState<number | "">("");
  const [amountError, setAmountError] = useState(false);
  const [step, setStep] = useState<Step>("amount");

  const [state, formAction, isPending] = useActionState(
    submitDonation,
    undefined
  );

  const handleTabChange = (t: DonateTab) => {
    setAmountError(false);
    setTab(t);
    setAmount("");
  };

  const goToDetails = () => {
    if (typeof amount !== "number" || amount <= 10) {
      setAmountError(true);
      return;
    }
    setStep("details");
  };

  const isAmountStep = step === "amount";

  return (
    <form
      action={formAction}
      className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {isAmountStep ? (
        <>
          <DonationAmount
            tab={tab}
            onTabChange={handleTabChange}
            amount={amount}
            setAmount={setAmount}
            nowAmount={nowAmount}
            regularAmount={regularAmount}
            // error={state?.errors?.amount}
          />
          {amountError && (
            <p className="text-red-500 text-sm">
              Minimum donate amount is $10.00
            </p>
          )}
        </>
      ) : (
        <>
          {/* Hidden amount so server receives it */}
          <input
            type="hidden"
            name="amount"
            value={amount === "" ? "" : amount}
          />
          <DonationDetails state={state} onBack={() => setStep("amount")} />
        </>
      )}

      {isAmountStep ? (
        <Button
          type="button"
          onClick={goToDetails}
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
            : tab === "once"
              ? `Donate Now ($${amount})`
              : `Donate Regularly ($${amount})`}
        </Button>
      )}

      {state?.message && (
        <div
          className={`mt-4 rounded-md p-3 text-sm ${
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
