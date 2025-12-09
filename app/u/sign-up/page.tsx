// app/u/signup/page.tsx
"use client";

import TermsAndPrivacyNotice from "@/app/(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { Header } from "@/app/ui/global/Header";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { useActionState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { signup } from "../lib/action";
import SocialLoginButtons from "../login/ui/SocialLoginButtons";

export default function Page() {
  const [state, formAction, isPending] = useActionState(signup, undefined);

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
        <form action={formAction} noValidate className="space-y-5">
          <div className="space-y-4">
            <Input
              id="email"
              label="Email address"
              placeholder="Enter your email address"
              type="email"
              defaultValue={state?.data?.email}
              Icon={MdEmail}
              error={state?.errors?.email}
            />
            <Input
              id="password"
              label="Password"
              placeholder="Set your password"
              type="password"
              defaultValue={state?.data?.password}
              Icon={MdPassword}
              error={state?.errors?.password}
            />
          </div>

          <ActionButton
            type="submit"
            fullWidth
            isLoading={isPending}
            overlay
            loadingText="Signing Up..."
          >
            Sign Up
          </ActionButton>

          {state?.message && (
            <P
              className={`text-center text-sm ${
                state.ok ? "text-green-700" : "text-red-600"
              }`}
            >
              {state.message}
            </P>
          )}
        </form>

        <TermsAndPrivacyNotice prefix="By creating an account, you agree to our" />

        {/* Log in link */}
        <Button
          variant="outline"
          as="link"
          href="/u/login"
          fullWidth
          className="mt-5"
        >
          Have an account? Log in
        </Button>
      </div>
    </div>
  );
}
