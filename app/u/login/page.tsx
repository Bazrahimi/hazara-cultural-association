// app/u/login/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { MdEmail, MdPassword } from "react-icons/md";

import {
  ActionButton,
  FormErrorMessage,
} from "../../ui/global/clientComponent";
import { Button, Input } from "../../ui/global/components";
import { Header } from "../../ui/global/Header";
import { auth } from "../lib/action";

import { setNotification } from "../lib/setNotification";
import SocialLoginButtons from "./ui/SocialLoginButtons";

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(auth, undefined);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state?.requiresVerification && state.redirectTo) {
      if (state.message) {
        setNotification(state.message);
      }

      router.push(state.redirectTo);
      return;
    }
  }, [state, router]);

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

        <form
          action={formAction}
          className="relative mt-2 space-y-6"
          noValidate
          aria-busy={isPending}
        >
          <div className="space-y-5">
            <Input
              id="email"
              label="Email Address"
              placeholder="Enter your email Address"
              type="email"
              defaultValue={state?.data?.email}
              Icon={MdEmail}
              error={state?.errors?.email}
              required
            />
            <Input
              id="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              defaultValue={state?.data?.password}
              Icon={MdPassword}
              error={state?.errors?.password}
              required
            />
          </div>

          <ActionButton
            type="submit"
            fullWidth
            isLoading={isPending}
            overlay
            loadingText="Logging in..."
            buttonClassName="mt-2"
          >
            Login
          </ActionButton>

          <FormErrorMessage message={state?.message} />
        </form>

        {/* Forgot password link */}
        <div className="flex justify-end mt-3">
          <Button
            as="link"
            href="/u/forgot-password"
            variant="outline"
            className="!border-none !shadow-none text-xs text-slate-600 hover:text-slate-900 hover:bg-transparent underline"
          >
            Forgot password?
          </Button>
        </div>

        <Button fullWidth variant="outline" as="link" href="/u/sign-up">
          New to HCA, Create account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
