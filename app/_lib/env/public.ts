const required = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`❌ Environment variable ${name} is missing!`);
  return value;
};

export const publicEnv = {
  baseUrl: required(process.env.NEXT_PUBLIC_BASE_URL, "NEXT_PUBLIC_BASE_URL"),
  cloudinaryCloudName: required(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  ),
  cloudinaryApiKey: required(
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    "NEXT_PUBLIC_CLOUDINARY_API_KEY",
  ),
  // add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY if you use Stripe.js
} as const;
