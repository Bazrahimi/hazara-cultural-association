// app/u/signup/page.tsx (or wherever this lives)
"use client";

import { Header } from "@/app/ui/global/Header";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Button, Input } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import { useActionState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { signup } from "../lib/action";

export default function Page() {
  const [state, formAction, isPending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-5 sm:p-7 md:p-8">
        <Header as="h1" size="sm" align="center" className="mb-10">
          Create your HCA account
        </Header>

        <form action={formAction} noValidate className="space-y-5">
          <div className="space-y-4">
            <Input
              id="email"
              label="Email address"
              placeholder="Enter your email address"
              type="email"
              defaultValue={state?.data?.email}
              Icon={MdEmail}
              error={state?.errors?.email}
              required
            />
            <Input
              id="password"
              label="Password"
              placeholder="Set your password"
              type="password"
              defaultValue={state?.data?.password}
              Icon={MdPassword}
              error={state?.errors?.password}
              required
            />
          </div>

          <ActionButton type="submit" fullWidth isLoading={isPending} overlay loadingText="Signing Up...">
            Sign Up
          </ActionButton>

          {state?.message && (
            <P
              className={`text-center text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}
            >
              {state.message}
            </P>
          )}
        </form>

        <P className="mt-4 text-center text-xs text-gray-600">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="underline underline-offset-2 hover:text-gray-900"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-2 hover:text-gray-900"
          >
            Privacy Policy
          </Link>
          .
        </P>

        <Button
          variant="outline"
          as="link"
          href="/u/login"
          fullWidth
          className="mt-5"
        >
          Have an account? Log in
        </Button>
      </div>
    </div>
  );
}
