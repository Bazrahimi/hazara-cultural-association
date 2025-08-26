"use client";
import { Button, Input } from "@/app/ui/global/components";
import { useState } from "react";

import { CiDollar } from "react-icons/ci";
const nowAmount = [50, 100, 250, 500];
const regularAmount = [20, 50, 100, 250];

export default function DonateForm() {
  const [tab, setTab] = useState<"once" | "regular">("once");
  const [amount, setAmount] = useState<number | "">("");

  const handleAmountClick = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Donating ${amount || "custom"} AUD (${tab === "once" ? "Now" : "Regularly"})`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Amount */}
      {/* I want move out this div into separate separate component. while keep the state amount in here */}
      <div>
        <div className="mb-6 flex border-b text-sm font-medium text-gray-600">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setTab("once");
            }}
            className={`w-1/2 border-b-2 py-2 rounded-none ${
              tab === "once"
                ? "border-blue-600 text-blue-700"
                : "border-transparent"
            }`}
          >
            Now
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setTab("regular");
            }}
            className={`w-1/2 border-b-2 py-2 rounded-none ${
              tab === "regular"
                ? "border-blue-600 text-blue-700"
                : "border-transparent"
            }`}
          >
            Regularly
          </Button>
        </div>

        {tab === "once" ? (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {nowAmount.map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => handleAmountClick(val)}
                className={`rounded-md border px-4 py-3 text-lg font-semibold transition ${
                  amount === val
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {regularAmount.map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => handleAmountClick(val)}
                className={`rounded-md border px-4 py-3 text-lg font-semibold transition ${
                  amount === val
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        )}

        {/* Custom input */}

        <Input
          id="donation-amount"
          Icon={CiDollar}
          label="Donation amount (AUD)"
          type="number"
          placeholder="Enter amount"
          value={amount === "" ? "" : amount} // stays controlled
          onChange={(v) => setAmount(v === "" ? "" : Number(v))}
          inputClassName="text-lg" // keep your larger text style
          inputProps={{
            min: 1,
            step: 1,
            // pattern can help on some browsers:
            pattern: "[0-9]*",
          }}
          endAdornment={<span className="text-sm">AUD</span>}
        />
      </div>

      {/* Submit button */}
      <Button type="submit" fullWidth className="text-center">
        Donate {tab === "once" ? "Now" : "Regularly"}
      </Button>

      {/* Footnote */}
      <p className="mt-3 text-xs text-gray-500">
        Every dollar you give goes back to the community.
      </p>
    </form>
  );
}
