// app/lib/routes/index.ts

export const AuthRoutes = {
  root: () => "/u",
  login: () => "/u/login",
  signUp: () => "/u/sign-up",
  forgotPassword: () => "/u/forgot-password",
  resetPassword: () => "/u/reset-password",
  verifyEmail: () => "/u/verify",
} as const;
