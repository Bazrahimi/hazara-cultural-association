// app/u/verify/page.tsx

import { AuthRoutes } from "@/app/_lib/routes";
import { safeAccountNext } from "@/app/_lib/session/authRedirects";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { redirect } from "next/navigation";
import { readVerifyCookies } from "../_lib/cookies";
import VerifyEmailForm from "./ui/VerifyEmailForm";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) => {
  const { next } = await searchParams;

  const ctx = await readVerifyCookies();
  if (!ctx) redirect(AuthRoutes.signUp());

  const { email, expiresAtMs } = ctx;

  const mask = email
    ? email.replace(/(.{2}).+(@.+)/, "$1••••••$2")
    : "your email";

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
        <VerifyEmailForm
          next={safeAccountNext(next)}
          expiresAtMs={Number(expiresAtMs)}
        />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
