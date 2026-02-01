// import { baseUrl } from "@/app/_lib/helper";
// import { MemberRoutes } from "@/app/_lib/routes";
// import { stripe } from "@/app/_lib/stripe";
// import { JoiningPlan } from "../../../_lib/definitions";

// export async function createMembershipCheckoutSession(params: {
//   plan: JoiningPlan;
//   priceId: string;
//   metadata: Record<string, string>;
//   customerEmail: string;
// }) {
//   return stripe.checkout.sessions.create({
//     mode: "subscription",
//     line_items: [{ price: params.priceId, quantity: 1 }],
//     customer_email: params.customerEmail,

//     success_url: `${baseUrl}${MemberRoutes.paymentSuccess()}?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${baseUrl}${MemberRoutes.paymentCancel()}`,

//     metadata: params.metadata,
//   });
// }
