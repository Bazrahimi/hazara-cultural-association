// app/shop/lib/actions/checkout.ts
"use server";

import { FieldErrors } from "@/app/_lib/actionHelper";
import { stripe } from "@/app/_lib/stripe/stripe";
import { redirect } from "next/navigation";
import type Stripe from "stripe";

import {
  BuyerSchema,
  CartSchema,
  type Buyer,
  type Cart,
  type CartItem,
} from "@/app/(disabled)/_shop/lib/schema";

/* utils */
const toAUDCents = (n: number) => Math.max(0, Math.round(n * 100));

/* action state */
export type CheckoutState = {
  ok: boolean;
  message?: string;
  buyerErrors?: FieldErrors<Buyer>;
  cartError?: string;
};

/** Detect the special error that Next throws for redirects */
function isNextRedirectError(err: unknown): err is { digest: string } {
  if (typeof err !== "object" || err === null) return false;
  const maybe = err as { digest?: unknown };
  return (
    typeof maybe.digest === "string" && maybe.digest.startsWith("NEXT_REDIRECT")
  );
}

export async function createCheckoutSession(
  _prev: CheckoutState | undefined,
  formData: FormData,
): Promise<CheckoutState | never | undefined> {
  try {
    /* parse form fields */
    const rawBuyer = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      contactNumber:
        String(formData.get("contactNumber") ?? formData.get("phone") ?? "") ||
        undefined,
      address1: String(
        formData.get("address1") ?? formData.get("address") ?? "",
      ),
      address2: String(formData.get("address2") ?? "") || undefined,
      suburb: String(formData.get("suburb") ?? ""),
      stateCode: String(formData.get("stateCode") ?? ""),
      postCode: String(
        formData.get("postCode") ?? formData.get("postcode") ?? "",
      ),
    };

    const itemsRaw = String(formData.get("items") ?? "[]");
    let cart: Cart = [];
    try {
      cart = JSON.parse(itemsRaw) as Cart;
    } catch {
      return { ok: false, message: "Invalid items payload." };
    }

    /* validate */
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
      const msg = cartParsed.error?.message ?? "Cart is invalid.";
      return { ok: false, message: msg, cartError: msg };
    }

    const buyer = buyerParsed.data;
    const validCart = cartParsed.data;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return { ok: false, message: "NEXT_PUBLIC_BASE_URL is not set." };
    }

    const successUrl = `${baseUrl}/shop/cart/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/shop/cart/checkout?canceled=1`;

    /* stripe objects */
    const address: Stripe.AddressParam = {
      line1: buyer.address1,
      line2: buyer.address2,
      city: buyer.suburb,
      state: buyer.stateCode,
      postal_code: buyer.postCode,
      country: "AU",
    };

    // upsert customer
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

    // line items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      validCart.map((it: CartItem) => ({
        quantity: it.qty,
        price_data: {
          currency: "aud",
          product_data: { name: it.name },
          unit_amount: toAUDCents(it.price),
        },
      }));

    // session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      payment_method_types: ["card"],
      // billing_address_collection: "required",

      customer_update: { name: "auto", address: "auto" },

      // Ensure the resulting PaymentIntent carries shipping details too
      payment_intent_data: {
        shipping: {
          name: buyer.fullName,
          phone: buyer.contactNumber || undefined,
          address: {
            line1: buyer.address1,
            line2: buyer.address2 || undefined,
            city: buyer.suburb,
            state: buyer.stateCode,
            postal_code: buyer.postCode,
            country: "AU",
          },
        },
      },

      // allow_promotion_codes: true,
      line_items,
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
          validCart.map(({ id, qty, price }) => ({ id, qty, price })),
        ),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      return {
        ok: false,
        message: "Unable to start payment session. Please try again.",
      };
    }

    // keep redirect LAST (this throws to perform navigation)
    redirect(session.url); // throws
  } catch (err) {
    if (isNextRedirectError(err)) throw err; // let Next handle it
    console.error("createCheckoutSession error:", err);
    return { ok: false, message: (err as Error).message ?? "Unexpected error" };
  }
}
