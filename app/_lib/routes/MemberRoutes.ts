// app/members/_lib/MemberRoutes.ts

export const MemberRoutes = {
  // Public member-facing pages
  root: () => "/members",
  join: () => "/members/join",

  // Payment flow
  payment: () => "/members/join/payment",
  paymentSuccess: () => "/members/join/payment/success",
  paymentCancel: () => "/members/join/payment/success/cancel",

  // Optional future-proofing
  // dashboard: () => "/members/dashboard",
  // profile: () => "/members/profile",
  // renew: () => "/members/renew",
} as const;
