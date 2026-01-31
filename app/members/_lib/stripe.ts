import { baseUrl } from "@/app/_lib/helper";
import { MemberRoutes } from "@/app/_lib/routes";
import { stripe } from "@/app/_lib/stripe";
import { JoiningPlan } from "./definitions";

export async function createMembershipCheckoutSession(params: {
  plan: JoiningPlan;
  priceId: string;
  metadata: Record<string, string>;
}) {
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: `${baseUrl}${MemberRoutes.paymentSuccess()}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}${MemberRoutes.paymentCancel()}`,
    metadata: params.metadata,
  });

  return checkout;
}
