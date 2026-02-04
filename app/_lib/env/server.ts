import "server-only";

const required = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`❌ Environment variable ${name} is missing!`);
  return value;
};

export const serverEnv = {
  postgresUrl: required(process.env.POSTGRES_URL, "POSTGRES_URL"),
  resendApiKey: required(process.env.RESEND_API_KEY, "RESEND_API_KEY"),
  sessionSecret: required(process.env.SESSION_SECRET, "SESSION_SECRET"),

  oAuth: {
    google: {
      clientId: required(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID"),
      clientSecret: required(
        process.env.GOOGLE_CLIENT_SECRET,
        "GOOGLE_CLIENT_SECRET",
      ),
    },
  },

  stripe: {
    secretKey: required(process.env.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY"),
    webhookSecret: required(
      process.env.STRIPE_WEBHOOK_SECRET,
      "STRIPE_WEBHOOK_SECRET",
    ),
    prices: {
      membershipMonthly: required(
        process.env.STRIPE_PRICE_MEMBERSHIP_MONTHLY,
        "STRIPE_PRICE_MEMBERSHIP_MONTHLY",
      ),
      membershipYearly: required(
        process.env.STRIPE_PRICE_MEMBERSHIP_YEARLY,
        "STRIPE_PRICE_MEMBERSHIP_YEARLY",
      ),
    },
  },

  cloudinary: {
    apiSecret: required(
      process.env.CLOUDINARY_API_SECRET,
      "CLOUDINARY_API_SECRET",
    ),
  },
} as const;
