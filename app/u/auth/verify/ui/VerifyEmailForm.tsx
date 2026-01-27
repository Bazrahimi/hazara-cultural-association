"use client";

import { useActionState, useEffect, useState } from "react";

import { ActionButton } from "@/app/ui/global/clientComponent";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";

import { resendCode, verifyCode } from "../../lib/action";
import { VerifyCodeState } from "../../lib/definitions";

const VerifyEmailForm = ({
  next,
  expiresAtMs,
}: {
  next?: string;
  expiresAtMs?: number;
}) => {
  const [state, formAction, isPending] = useActionState<
    VerifyCodeState | undefined,
    FormData
  >(verifyCode, undefined);

  const [cooldown, setCooldown] = useState(0);

  // Expiry countdown (seconds remaining)
  const [remaining, setRemaining] = useState<number>(() => {
    if (!expiresAtMs) return 0;
    return Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1000));
  });

  useEffect(() => {
    if (!expiresAtMs) return;
    const t = setInterval(() => {
      const s = Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1000));
      setRemaining(s);
    }, 1000);
    return () => clearInterval(t);
  }, [expiresAtMs]);

  const expired = expiresAtMs ? remaining <= 0 : true;

  // Resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <>
      {/* Show expiry timer */}
      <P className="text-xs text-slate-500 mb-3">
        {expired ? (
          <span className="text-red-600 font-semibold">
            Code expired. Please request a new code.
          </span>
        ) : (
          <>
            Code expires in{" "}
            <strong>
              {mm}:{ss}
            </strong>
          </>
        )}
      </P>

      <form action={formAction} className="space-y-4" noValidate>
        <input type="hidden" name="next" value={next ?? ""} />

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
          // disabled={expired}
        />

        <ActionButton
          type="submit"
          fullWidth
          isLoading={isPending}
          overlay
          loadingText="Verifying..."
          disabled={expired}
        >
          Verify
        </ActionButton>
      </form>

      {state?.message && (
        <P
          className={`mt-3 text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}
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

              const res = await resendCode();
              if (res.ok) {
                setCooldown(60);
                // optional: if your resend action resets cookies with a new exp,
                // you should refresh the page or return expiresAtMs from the action.
              }
            }}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailForm;
