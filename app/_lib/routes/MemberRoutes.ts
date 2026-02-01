// app/members/_lib/MemberRoutes.ts
const members = "/members";
const authJoin = `${members}/auth/join`;
const payment = `${authJoin}/payment`;

export const MemberRoutes = {
  // Public member-facing pages
  root: () => members,
  join: () => authJoin,

  // Payment flow
  payment: () => payment,
  paymentSuccess: () => `${payment}/success`,
  paymentCancel: () => `${payment}/cancel`,

  // Optional future-proofing
  // dashboard: () => "/members/dashboard",
  // profile: () => "/members/profile",
  // renew: () => "/members/renew",
} as const;
