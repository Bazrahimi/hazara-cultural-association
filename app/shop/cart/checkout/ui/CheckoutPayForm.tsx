// app/shop/ui/CheckoutPayForm.tsx
"use client";

import { processCheckoutPayment } from "@/app/shop/lib/action";
import type { Contact, FullAddress } from "@/app/shop/lib/definitions";
import { useCart } from "@/app/shop/ui/cart/CartContext";
import { Button } from "@/app/ui/global/components";

type Props = {
  email: string;
  contact: Contact;
  address: FullAddress;
  disabled?: boolean;
};

export default function CheckoutPayForm({
  email,
  contact,
  address,
  disabled,
}: Props) {
  const { items } = useCart();
  const payload = items.map((it) => ({
    name: it.name,
    price: it.price,
    qty: it.qty,
  }));

  return (
    <form action={processCheckoutPayment}>
      {/* cart */}
      <input type="hidden" name="items" value={JSON.stringify(payload)} />

      {/* identity */}
      <input type="hidden" name="email" value={email ?? ""} />
      <input type="hidden" name="firstName" value={contact.firstName ?? ""} />
      <input type="hidden" name="lastName" value={contact.lastName ?? ""} />
      <input type="hidden" name="phone" value={contact.phone ?? ""} />

      {/* address */}
      <input type="hidden" name="address" value={address.address ?? ""} />
      <input type="hidden" name="address2" value={address.address2 ?? ""} />
      <input type="hidden" name="suburb" value={address.suburb ?? ""} />
      <input
        type="hidden"
        name="stateCode"
        value={address.stateCode || address.state || ""}
      />
      <input type="hidden" name="postcode" value={address.postcode ?? ""} />

      <Button type="submit" fullWidth disabled={disabled}>
        Pay
      </Button>
    </form>
  );
}
