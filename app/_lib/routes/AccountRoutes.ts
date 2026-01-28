export const AccountRoutes = {
  root: () => "/account",

  // Account settings
  settings: () => "/account/settings",
  profile: () => "/account/settings/profile",
  changePassword: () => "/account/settings/change-password",

  addresses: () => "/account/settings/addresses",
  newAddress: () => "/account/settings/addresses/new",

  // Listings
  newListing: () => "/account/listing/new",
} as const;