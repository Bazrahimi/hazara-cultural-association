const required = (value: string | undefined, name: string): string => {
  console.log(name, value)
  if (!value)
    throw new Error(
      `❌ Environment variable ${name} is missing! Check your .env file.`,
    );

  
  return value;
};

export const processEnv = {
  baseUrl: required(process.env.NEXT_PUBLIC_BASE_URL, "NEXT_PUBLIC_BASE_URL"),
  postgresUrl: required(process.env.POSTGRES_URL, "POSTGRES_URL"),
  ResendApiKey: required(process.env.RESEND_API_KEY, "RESEND_API_KEY"),
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
    stripeSecretKey: required(
      process.env.STRIPE_SECRET_KEY,
      "STRIPE_SECRET_KEY",
    ),
    webhookSecret: required(
      process.env.STRIPE_WEBHOOK_SECRET,
      "process.env.STRIPE_WEBHOOK_SECRET",
    ),
    payment: {
      membership: {
        monthly: required(
          process.env.STRIPE_PRICE_MEMBERSHIP_MONTHLY,
          "STRIPE_PRICE_MEMBERSHIP_MONTHLY",
        ),
        annual: required(
          process.env.STRIPE_PRICE_MEMBERSHIP_YEARLY,
          "STRIPE_PRICE_MEMBERSHIP_YEARLY",
        ),
      },
    },
  },
  cloudinary: {
    cloudName: required(
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
    ),
    apiKey: required(
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      "NEXT_PUBLIC_CLOUDINARY_API_KEY",
    ),
    apiSecret: required(
      process.env.CLOUDINARY_API_SECRET ||
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      " CLOUDINARY_API_SECRET Or NEXT_PUBLIC_CLOUDINARY_API_SECRET",
    ),
  },
};
