// app/_shop/ui/CheckoutPayForm.tsx
"use client";

import { createCheckoutSession } from "@/app/(disabled)/_shop/lib/action";
import type {
  Contact,
  FullAddress,
} from "@/app/(disabled)/_shop/lib/definitions";
import { useCart } from "@/app/(disabled)/_shop/ui/cart/CartContext";
import { Button } from "@/app/_ui";
import { useActionState } from "react";

type Props = {
  email: string;
  contact: Contact; // expects { firstName, lastName, phone }
  address: FullAddress; // expects { address, address2, suburb, state/stateCode, postcode }
  disabled?: boolean;
};

export default function CheckoutPayForm({
  email,
  contact,
  address,
  disabled,
}: Props) {
  const [state, formAction, isPending] = useActionState(
    createCheckoutSession,
    undefined,
  );
  const { items } = useCart();

  // ✅ Cart payload must include `id`
  const payload = items.map((it) => ({
    id: it.id, // make sure your cart items have `id`
    name: it.title,
    price: (it.priceCents + it.postageCents) / 100,
    qty: it.qty,
    // image: it.image,    // optional if you keep it in the schema
  }));

  return (
    <form action={formAction} className="space-y-2">
      {/* cart */}
      <input type="hidden" name="items" value={JSON.stringify(payload)} />

      {/* buyer */}
      <input type="hidden" name="email" value={email ?? ""} />
      <input type="hidden" name="fullName" value={contact.fullName ?? ""} />
      <input type="hidden" name="contactNumber" value={contact.phone ?? ""} />

      {/* address (use names the server action expects) */}
      <input type="hidden" name="address1" value={address.address ?? ""} />
      <input type="hidden" name="address2" value={address.address2 ?? ""} />
      <input type="hidden" name="suburb" value={address.suburb ?? ""} />
      <input
        type="hidden"
        name="stateCode"
        value={address.stateCode || address.state || ""}
      />
      <input type="hidden" name="postCode" value={address.postcode ?? ""} />

      <Button type="submit" fullWidth disabled={disabled || isPending}>
        {isPending ? "Redirecting…" : "Pay"}
      </Button>

      {/* Optional: show server error (if any) */}
      {state && !state.ok && state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}
