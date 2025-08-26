
"use client";

import React from "react";
import { Button, Input } from "@/app/ui/global/components";
import { CiDollar } from "react-icons/ci";

export type DonateTab = "once" | "regular";

type Props = {
  tab: DonateTab;
  onTabChange: (t: DonateTab) => void;
  amount: number | "";
  setAmount: React.Dispatch<React.SetStateAction<number | "">>;
  nowAmount: number[];
  regularAmount: number[];
};

export default function DonationAmount({
  tab,
  onTabChange,
  amount,
  setAmount,
  nowAmount,
  regularAmount,
}: Props) {
  const handleAmountClick = (value: number) => setAmount(value);

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex border-b text-sm font-medium text-gray-600">
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            onTabChange("once");
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
            onTabChange("regular");
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

      {/* Preset amounts */}
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
        value={amount === "" ? "" : amount}
        onChange={(v) => setAmount(v === "" ? "" : Number(v))}
        inputClassName="text-lg"
        inputProps={{
          min: 1,
          step: 1,
          pattern: "[0-9]*",
          inputMode: "numeric",
        }}
        endAdornment={<span className="text-sm">AUD</span>}
      />
    </div>
  );
}
