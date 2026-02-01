"use client";
import { ActionButton } from "@/app/_ui";
import { useState } from "react";

export const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: "sample Product", price: 2000, quantity: 1 }],
      }),
    });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  };

  return (
    <ActionButton
      isLoading={loading}
      loadingText="Checkout"
      onClick={handleCheckout}
    >
      Checkout
    </ActionButton>
  );
};
