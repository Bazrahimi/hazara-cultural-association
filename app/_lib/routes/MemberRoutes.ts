// app/members/_lib/MemberRoutes.ts

export const MemberRoutes = {
  // Public member-facing pages
  root: () => "/members",
  join: () => "/members/auth/join",

  // Payment flow
  payment: () => "/members/auth/join/payment",
  paymentSuccess: () => "/members/auth/join/payment/success",
  paymentCancel: () => "/members/auth/join/payment/success/cancel",

  // Optional future-proofing
  // dashboard: () => "/members/dashboard",
  // profile: () => "/members/profile",
  // renew: () => "/members/renew",
} as const;
