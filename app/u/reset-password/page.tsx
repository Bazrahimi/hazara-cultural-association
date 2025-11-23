// app/u/reset-password/page.tsx
"use client";

import { useActionState } from "react";

import { Header } from "@/app/ui/global/Header";
import { FormErrorMessage } from "@/app/ui/global/clientComponent";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";

import { resetPassword } from "../lib/action";

const ResetPasswordPage = () => {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    undefined
  );

  const isSuccess = Boolean(state?.ok);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        {/* 🔒 Hide the entire header + description on success */}
        {!isSuccess && (
          <>
            <Header as="h2" size="md" align="center" className="mb-6">
              Set a new password
            </Header>

            <P className="text-slate-600 mb-4 text-sm">
              Choose a strong password that you don’t use elsewhere. After
              submitting, you’ll be able to log in with your new password.
            </P>
          </>
        )}

        {/* 🎉 SUCCESS BLOCK */}
        {isSuccess ? (
          <div className="space-y-6 text-center py-6">
            <P className="text-green-700 text-base font-medium">
              ✅ Your password has been successfully updated.
            </P>
            <P className="text-slate-600 text-sm">
              You can now log in with your new password.
            </P>

            <Button fullWidth as="link" href="/u/login" className="mt-4">
              Continue to Login
            </Button>
          </div>
        ) : (
          /* 📝 FORM (shown only when not successful) */
          <form action={formAction} className="space-y-4" noValidate>
            <Input
              id="password"
              type="password"
              label="New password"
              placeholder="Enter a new password"
              error={state?.errors?.password}
              required
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm new password"
              placeholder="Re-enter your new password"
              error={state?.errors?.confirmPassword}
              required
            />

            <Button type="submit" fullWidth disabled={isPending}>
              {isPending ? "Updating password…" : "Update password"}
            </Button>

            <FormErrorMessage message={state?.message} />
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
