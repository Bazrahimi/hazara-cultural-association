"use client";

import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { useActionState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";

import { signup } from "../../_lib/action";

const SignupForm = ({ next }: { next?: string }) => {
  const [state, formAction, isPending] = useActionState(signup, undefined);
  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="next" value={next} />
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
  );
};

export default SignupForm;
