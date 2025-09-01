// app/shop/lib/actions/checkout.ts
"use server";

import { stripe } from "@/app/lib/stripe";
import { redirect } from "next/navigation";
import type Stripe from "stripe";

// ✅ import your schemas & helper types
import {
  BuyerSchema,
  CartSchema,
  type Buyer,
  type Cart,
  type CartItem,
  type FieldErrors,
} from "@/app/shop/lib/schema";

/* ---------- util ---------- */
const toAUDCents = (n: number) => Math.max(0, Math.round(n * 100));

/* ---------- action state ---------- */
export type CheckoutState = {
  ok: boolean;
  message?: string;
  buyerErrors?: FieldErrors<Buyer>;
  cartError?: string;
};

export async function createCheckoutSession(
  _prev: CheckoutState | undefined,
  formData: FormData
): Promise<CheckoutState | never> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return { ok: false, message: "NEXT_PUBLIC_BASE_URL is not set." };
    }

    // ---------- parse incoming form fields ----------
    const rawBuyer = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      contactNumber:
        String(formData.get("contactNumber") ?? formData.get("phone") ?? "") ||
        undefined,
      // support old/new names
      address1: String(
        formData.get("address1") ?? formData.get("address") ?? ""
      ),
      address2: String(formData.get("address2") ?? "") || undefined,
      suburb: String(formData.get("suburb") ?? ""),
      stateCode: String(formData.get("stateCode") ?? ""),
      postCode: String(
        formData.get("postCode") ?? formData.get("postcode") ?? ""
      ),
    };

    const itemsRaw = String(formData.get("items") ?? "[]");
    let cart: Cart = [];
    try {
      cart = JSON.parse(itemsRaw) as Cart;
    } catch {
      return { ok: false, message: "Invalid items payload." };
    }

    // ---------- validate with Zod ----------
    const buyerParsed = BuyerSchema.safeParse(rawBuyer);
    if (!buyerParsed.success) {
      const fe = buyerParsed.error.flatten().fieldErrors as FieldErrors<Buyer>;
      return {
        ok: false,
        message: "Please check your contact & address details.",
        buyerErrors: fe,
      };
    }

    const cartParsed = CartSchema.safeParse(cart);
    if (!cartParsed.success) {
      return {
        ok: false,
        message: cartParsed.error?.message ?? "Cart is invalid.",
        cartError: cartParsed.error?.message ?? "Cart is invalid.",
      };
    }

    const buyer = buyerParsed.data;
    const validCart = cartParsed.data;

    console.log(buyer, validCart)

    return 

    // ---------- Stripe objects ----------
    const address: Stripe.AddressParam = {
      line1: buyer.address1,
      line2: buyer.address2,
      city: buyer.suburb,
      state: buyer.stateCode,
      postal_code: buyer.postCode,
      country: "AU",
    };

    // Upsert customer
    const found = await stripe.customers.list({ email: buyer.email, limit: 1 });
    const customer =
      found.data[0] ??
      (await stripe.customers.create({
        name: buyer.fullName,
        email: buyer.email,
        phone: buyer.contactNumber,
        address,
      }));

    if (found.data[0]) {
      await stripe.customers.update(found.data[0].id, {
        name: buyer.fullName,
        phone: buyer.contactNumber,
        address,
      });
    }

    // Line items
    const line_items = validCart.map((it: CartItem) => ({
      quantity: it.qty,
      price_data: {
        currency: "aud",
        product_data: { name: it.name },
        unit_amount: toAUDCents(it.price),
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_update: { name: "auto", address: "auto" },
      allow_promotion_codes: true,
      line_items,

      // Save details for back-office/webhook reconciliation
      metadata: {
        fullName: buyer.fullName,
        email: buyer.email,
        contactNumber: buyer.contactNumber ?? "",
        address1: buyer.address1,
        address2: buyer.address2 ?? "",
        suburb: buyer.suburb,
        stateCode: buyer.stateCode,
        postCode: buyer.postCode,
        cart: JSON.stringify(
          validCart.map(({ id, qty, price }) => ({ id, qty, price }))
        ),
      },

      success_url: `${baseUrl}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop/checkout?canceled=1`,
    });

    if (!session.url) {
      return { ok: false, message: "Failed to create checkout session." };
    }

    redirect(session.url);
  } catch (err: any) {
    console.error("createCheckoutSession error:", err);
    return { ok: false, message: err?.message ?? "Unexpected error" };
  }
}
