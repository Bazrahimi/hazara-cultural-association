// app/lib/routes/auth.ts
const uAuth = "/u/auth";
const googleOAuth = "/u/auth/oauth/google";
export const AuthRoutes = {
  // Root
  root: () => uAuth,

  // Core auth
  login: () => `$${uAuth}/login`,
  signUp: () => `${uAuth}/sign-up`,
  forgotPassword: () => `${uAuth}/forgot-password`,
  resetPassword: () => `${uAuth}/reset-password`,
  verifyEmail: () => `${uAuth}/verify`,

  // OAuth – Google
  googleOAuthStart: () => `${googleOAuth}/start`,
  googleOAuthCallback: () => `${googleOAuth}/callback`,
} as const;
