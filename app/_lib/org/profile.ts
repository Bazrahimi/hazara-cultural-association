const ORG_DOMAIN = "hazara.org.au" as const;

export const ORG_PROFILE = {
  orgName: "Hazara Cultural Association (HCA)",
  orgNameFarsi: "انجمن فرهنگی هزاره",

  domain: ORG_DOMAIN,

  email: `info@${ORG_DOMAIN}`,
  website: ORG_DOMAIN,

  address: "Melbourne, Victoria, Australia",

  logoUrl: "/images/logo-transparent-hd.png",

  contactNumber: undefined as string | undefined,
} as const;
