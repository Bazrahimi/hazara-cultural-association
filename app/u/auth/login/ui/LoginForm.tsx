"use client";
import {
  ActionButton,
  FormErrorMessage,
} from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { auth } from "../../lib/action";
import { setNotification } from "../../lib/setNotification";

const LoginForm = ({ next }: { next: string }) => {
  const [state, formAction, isPending] = useActionState(auth, undefined);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.requiresVerification && state.redirectTo) {
      if (state.message) {
        setNotification(state.message);
      }
      router.push(state.redirectTo);
      return;
    }
  }, [state, router]);
  return (
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
  );
};

export default LoginForm;
