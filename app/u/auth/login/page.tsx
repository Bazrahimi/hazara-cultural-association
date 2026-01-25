// app/u/login/page.tsx

import { Button } from "../../../ui/global/components";
import { Header } from "../../../ui/global/Header";

import { AuthRoutes } from "@/app/lib/routes";
import LoginForm from "./ui/LoginForm";
import SocialLoginButtons from "./ui/SocialLoginButtons";
import { safeAccountNext } from "@/app/lib/session/authRedirects";


const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) => {
  const { next } = await searchParams;
  const safeNext = safeAccountNext(next)
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center">
      {/* Development Banner */}
      <div className="w-full max-w-3xl mb-6 rounded-md bg-yellow-100 border border-yellow-300 p-3 text-center">
        <p className="text-yellow-800 font-semibold">
          🚧 This website is currently under development. Some features may not
          work as expected.
        </p>
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h2" size="md" align="center" className="mb-6">
          Login to HCA Account
        </Header>

        {/* Social logins first (optional, feels modern) */}
        <SocialLoginButtons className="mb-6" />

        {/* Optional separator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">
            OR
          </span>
          <div className="h-px flex-1 bg-slate-2 00" />
        </div>

        <LoginForm next={safeNext} />

        {/* Forgot password link */}
        <div className="flex justify-end mt-3">
          <Button
            as="link"
            href={AuthRoutes.forgotPassword()}
            variant="outline"
            className="!border-none !shadow-none text-xs text-slate-600 hover:text-slate-900 hover:bg-transparent underline"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          fullWidth
          variant="outline"
          as="link"
          href={AuthRoutes.signUp()}
        >
          New to HCA, Create account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
