// app/account/settings/change-password/page.tsx
"use client";

import { Button } from "@/app/ui/global/components";
import { useActionState } from "react";

import { Header } from "@/app/ui/global/Header";
import {
  ActionButton,
  FormErrorMessage,
} from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";

import { changePassword } from "../../../u/lib/action";

const ChangePasswordPage = () => {
  const [state, formAction, isPending] = useActionState(
    changePassword,
    undefined
  );

  const isSuccess = Boolean(state?.ok);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h2" size="md" align="center" className="mb-4">
          Change your password
        </Header>

        <P className="text-slate-600 mb-6 text-sm text-center">
          For security, please enter your current password and choose a new one.
        </P>

        {isSuccess && (
          <div className="space-y-6 text-center py-6">
            <P className="mb-4 text-green-700 text-sm text-center">
              ✅ {state?.message ?? "Your password has been updated."}
            </P>
            <Button fullWidth as="link" href="/account" className="mt-4">
              Continue to your Account Dashboard
            </Button>
          </div>
        )}
        {!isSuccess && (

        <form action={formAction} noValidate className="space-y-4">
          <Input
            id="currentPassword"
            type="password"
            label="Current password"
            placeholder="Enter your current password"
            error={state?.errors?.currentPassword}
            required
          />

          <Input
            id="newPassword"
            type="password"
            label="New password"
            placeholder="Choose a new password"
            error={state?.errors?.newPassword}
            required
          />

          <Input
            id="confirmNewPassword"
            type="password"
            label="Confirm new password"
            placeholder="Re-enter your new password"
            error={state?.errors?.confirmNewPassword}
            required
          />

          <ActionButton
            type="submit"
            fullWidth
            overlay
            loadingText="Updating Password"
            isLoading={isPending}
          >
            Update Password
          </ActionButton>

          <FormErrorMessage message={state?.message} />
        </form>
        )}

      </div>
    </div>
  );
};

export default ChangePasswordPage;
