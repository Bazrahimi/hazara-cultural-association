"use client";
import { useState } from "react";

const presetAmounts = [50, 150, 500];

export default function DonateForm() {
  const [tab, setTab] = useState<"once" | "regular">("once");
  const [amount, setAmount] = useState<number | "">("");

  const handleAmountClick = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Donating ${amount || "custom"} AUD (${tab === "once" ? "Now" : "Regularly"})`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Tabs */}
      <div className="mb-6 flex border-b text-sm font-medium text-gray-600">
        <button
          type="button"
          onClick={() => setTab("once")}
          className={`w-1/2 border-b-2 py-2 ${
            tab === "once"
              ? "border-blue-600 text-blue-700"
              : "border-transparent hover:text-blue-600"
          }`}
        >
          Now
        </button>
        <button
          type="button"
          onClick={() => setTab("regular")}
          className={`w-1/2 border-b-2 py-2 ${
            tab === "regular"
              ? "border-blue-600 text-blue-700"
              : "border-transparent hover:text-blue-600"
          }`}
        >
          Regularly
        </button>
      </div>

      {/* Preset amounts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {presetAmounts.map((val) => (
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

      {/* Custom input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount === "" ? "" : amount}
        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
        className="mb-6 w-full rounded-md border border-gray-300 p-3 text-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

      {/* Submit button */}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-700 px-4 py-3 text-white font-medium text-lg hover:bg-blue-600"
      >
        Donate {tab === "once" ? "Now" : "Regularly"}
      </button>

      {/* Footnote */}
      <p className="mt-3 text-xs text-gray-500">
        Donations of $2 or more may be tax-deductible in Australia. A receipt
        will be issued in your name.
      </p>
    </form>
  );
}
