export const PublicRoutes = {
  home: () => "/",
  about: () => "/about-us",
  contact: () => "/contact-us",
  partners: () => "/partners",

  // If you want to keep legal routes “public”
  privacyPolicy: () => "/privacy-policy",
  privacyDataDeletion: () => "/privacy-policy/data-deletion",
  termsOfService: () => "/terms-of-service",

  // Members (public entry)
  members: () => "/members",
  joinMember: () => "/members/join",
} as const;