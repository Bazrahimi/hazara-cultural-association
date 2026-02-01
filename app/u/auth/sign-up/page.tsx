// app/u/signup/page.tsx

import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { AuthRoutes } from "@/app/_lib/routes";
import { safeAccountNext } from "@/app/_lib/session/authRedirects";
import { Button, Header } from "@/app/_ui";
import SocialLoginButtons from "../login/ui/SocialLoginButtons";
import SignupForm from "./ui/SignupForm";

const SignupPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) => {
  const { next } = await searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h1" size="sm" align="center" className="mb-6">
          Create your HCA account
        </Header>

        {/* Social Login */}
        <SocialLoginButtons className="mb-6" />

        {/* Separator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">
            OR
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Signup Form */}
        <SignupForm next={safeAccountNext(next)} />

        <TermsAndPrivacyNotice prefix="By creating an account, you agree to our" />

        {/* Log in link */}
        <Button
          variant="outline"
          as="link"
          href={AuthRoutes.login()}
          fullWidth
          className="mt-5"
        >
          Have an account? Log in
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
