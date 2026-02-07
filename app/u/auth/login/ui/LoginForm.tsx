"use client";
import { ActionButton, FormErrorMessage, Input } from "@/app/_ui";
import { useActionState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { auth } from "../../_lib/action";

const LoginForm = ({ next }: { next: string }) => {
  const [state, formAction, isPending] = useActionState(auth, undefined);

  return (
    <form
      action={formAction}
      className="relative mt-2 space-y-6"
      noValidate
      aria-busy={isPending}
    >
      <input type="hidden" name="next" value={next} />
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
