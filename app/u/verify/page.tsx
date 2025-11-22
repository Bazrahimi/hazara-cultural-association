// app/u/verify/verify-form.tsx
"use client";

import { useActionState, useEffect, useState } from "react";

import { Header } from "@/app/ui/global/Header";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { ActionButton } from "@/app/ui/global/clientComponent";
import {
  resendCodeAction,
  verifyCodeAction,
  type VerifyState,
} from "./lib/verify-action";


export default function VerifyEmailForm({ email }: { email: string }) {
  const [state, formAction, isPending] = useActionState<
    VerifyState | undefined,
    FormData
  >(verifyCodeAction, undefined);

  const [cooldown, setCooldown] = useState(0);

  // Countdown for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const mask = email ? email.replace(/(.{2}).+(@.+)/, "$1••••••$2") : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
        <Header as="h1" size="sm" className="mb-2">
          Verify your email
        </Header>

        <P className="text-slate-600 mb-4">
          Enter the 6-digit code we sent to{" "}
          <span className="font-medium">{mask || "your email"}</span>. It
          expires in 10 minutes.
        </P>

        <form action={formAction} className="space-y-4" noValidate>
          <Input
            type="text"
            id="code"
            label="Verification code"
            placeholder="123456"
            inputProps={{
              inputMode: "numeric",
              pattern: "\\d{6}",
              maxLength: 6,
              autoComplete: "one-time-code",
            }}
            required
          />

          <ActionButton
            type="submit"
            fullWidth
            isLoading={isPending}
            overlay
            loadingText="Verifying..."
          >
            Verify
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

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <P className="text-xs text-slate-500">Didn’t get a code?</P>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                if (cooldown > 0) return;
                const res = await resendCodeAction();
                if (res.ok) setCooldown(60);
              }}
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
            </Button>
          </div>

          {cooldown > 0 && (
            <P className="text-xs text-slate-500 text-right">
              You can request another code in <strong>{cooldown}s</strong>
            </P>
          )}
        </div>
      </div>
    </div>
  );
}
