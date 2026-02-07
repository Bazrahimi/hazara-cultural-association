
// app/members/_lib/MemberRoutes.ts
const members = "/members";
const authJoin = `${members}/auth/join`;
const checkout = `${authJoin}/checkout`;

export const MemberRoutes = {
  // Public member-facing pages
  root: () => members,
  join: () => authJoin,

  // Payment flow
  checkout: () => checkout,
  checkoutSuccess: () => `${checkout}/success`,
  checkoutCancel: () => `${checkout}/cancel`,

  // Optional future-proofing
  // dashboard: () => "/members/dashboard",
  // profile: () => "/members/profile",
  // renew: () => "/members/renew",
} as const;