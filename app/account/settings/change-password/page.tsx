// app/account/settings/change-password/page.tsx
"use client";

import { useActionState } from "react";

import { ActionButton, FormErrorMessage, Header, Input, P } from "@/app/_ui";

import { changePassword } from "@/app/u/auth/_lib/action";
import { setNotification } from "@/app/u/auth/_lib/setNotification";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChangePasswordPage = () => {
  const [state, formAction, isPending] = useActionState(
    changePassword,
    undefined,
  );
  const router = useRouter();

  const isSuccess = Boolean(state?.ok);

  useEffect(() => {
    if (!state) return;
    if (!state.ok) return;

    // 1) fire notification
    setNotification(state.message ?? "Your password has been updated.");

    // 2) redirect to account
    router.push("/account");
  }, [state, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h2" size="md" align="center" className="mb-4">
          Change your password
        </Header>

        <P className="text-slate-600 mb-6 text-sm text-center">
          For security, please enter your current password and choose a new one.
        </P>

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
