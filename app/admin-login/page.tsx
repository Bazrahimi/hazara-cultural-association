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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h2" size="md" align="center" className="mb-10">
          Admin Login
        </Header>
        <Header  as="h3" size="sm" align="center"> Enter your email and password to continue.</Header>

        <form action={formAction} className="relative mt-6 space-y-6">
          <div className="space-y-5">
            <Input
              id="email"
              label="Email Address"
              placeholder="Enter your email Address"
              type="email"
              defaultValue={state?.email}
              Icon={MdEmail}
              error={state?.errors?.email}
              required
            />
            <Input
              id="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              defaultValue={state?.password}
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
      </div>
    </div>
  );
};

export default LoginPage;
