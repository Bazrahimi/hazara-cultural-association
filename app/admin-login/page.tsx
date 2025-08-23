"use client";
import { useActionState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { authenticate } from "../lib/action";
import { ActionButton, FormErrorMessage } from "../ui/global/clientComponent";
import { Header, Input } from "../ui/global/components";

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <form action={formAction} className="relative">
      <div className="flex-1">
        <Header size="md" align="center">
          Login to admin account.
        </Header>

        <div className="w-full">
          <Input
            id="email"
            placeholder="Email Address"
            type="email"
            defaultValue={state?.email}
            Icon={MdEmail}
            error={state?.errors?.email}
          />

          <Input
            id="password"
            placeholder="Enter your Password"
            type="password"
            defaultValue={state?.password}
            Icon={MdPassword}
            error={state?.errors?.password}
          />
        </div>

        {/* Submit Button */}
        <ActionButton
          type="submit"
          fullWidth
          isLoading={isPending}
          overlay
          loadingText="Logging in..."
        >
          Login
        </ActionButton>
        {/* Message Error Field */}
        <FormErrorMessage message={state?.message} />
      </div>
    </form>
  );
};

export default LoginPage;
