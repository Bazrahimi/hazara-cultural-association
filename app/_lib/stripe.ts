//app/_lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const MEMBER_PRICE_ID = {
  monthly: process.env.STRIPE_PRICE_MEMBERSHIP_MONTHLY!,
  annual: process.env.STRIPE_PRICE_MEMBERSHIP_YEARLY!,
} as const;


// const checkout = await stripe.checkout.sessions.create({
//   mode: "subscription",
//   line_items: [
//     {
//       price: PRICE_ID[plan], // "monthly" | "annual"
//       quantity: 1,
//     },
//   ],
//   success_url: "...",
//   cancel_url: "...",
// });