// app/u/forgot-password/page.tsx
"use client";

import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { forgotPassword } from "../lib/action";
// we will create this action in the next step
// import { requestPasswordReset } from "../lib/password-actions";

const ForgotPasswordPage = () => {
  // Placeholder until we wire the real action
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.requiresVerification && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center px-4 justify-center">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h2" size="sm" align="center" className="mb-6">
          Forgot your password?
        </Header>

        <P className="text-slate-600 mb-4 text-sm">
          Enter the email address associated with your account.
        </P>

        <form action={formAction} className="space-y-4" noValidate>
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            required
            defaultValue={state?.data?.email}
            error={state?.errors?.email}
          />

          <ActionButton
            type="submit"
            fullWidth
            isLoading={isPending}
            overlay
            loadingText="Sending Code..."
          >
            Send Verification Code
          </ActionButton>
        </form>

        {state?.message && (
          <P
            className={`mt-3 text-sm ${
              state.ok ? "text-green-700" : "text-red-600"
            }`}
          >
            {state.message}
          </P>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
