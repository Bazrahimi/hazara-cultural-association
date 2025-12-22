// app/lib/routes/auth.ts

export const AuthRoutes = {
  // Root
  root: () => "/u/auth",

  // Core auth
  login: () => "/u/auth/login",
  signUp: () => "/u/auth/sign-up",
  forgotPassword: () => "/u/auth/forgot-password",
  resetPassword: () => "/u/auth/reset-password",
  verifyEmail: () => "/u/auth/verify",

  // OAuth – Google
  googleOAuthStart: () => "/u/auth/oauth/google/start",
  googleOAuthCallback: () => "/u/auth/oauth/google/callback",
} as const;
