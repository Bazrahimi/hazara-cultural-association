//app/_lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET!;




export const EVENT_TYPE = {
  checkoutCompleted: "checkout.session.completed",
  invoicePaid: "invoice.paid",
  invoicePaymentFailed: "invoice.payment_failed",
} as const;

/**
 * 
 * Card Number: 4242 4242 4242 4242

CVC: Any 3 digits (e.g., 123)

Expiry: Any future date (e.g., 12 / 30)

ZIP Code: Any valid ZIP (e.g., 90210)
 

Scenario,Card Number
Generic Decline,4000 0000 0000 0002
Insufficient Funds,4000 0000 0000 9995
Lost Card,4000 0000 0000 9987
Expired Card,4000 0000 0000 0069
Incorrect CVC,4000 0000 0000 0127

 */