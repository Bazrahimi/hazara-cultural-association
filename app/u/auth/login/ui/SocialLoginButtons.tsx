// app/u/ui/SocialLoginButtons.tsx
import { AuthRoutes } from "@/app/lib/routes";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

type SocialLoginButtonsProps = {
  className?: string;
};

export default function SocialLoginButtons({
  className = "",
}: SocialLoginButtonsProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Google Login */}
      <Link
        href={AuthRoutes.googleOAuthStart()}
        className="
          flex w-full items-center justify-center gap-2
          rounded-md border border-slate-200 bg-white
          px-4 py-2.5 text-sm font-medium text-slate-700
          shadow-sm hover:bg-slate-50 hover:border-slate-300
          transition-colors
        "
      >
        <FaGoogle className="h-4 w-4" aria-hidden="true" />
        <span>Continue with Google</span>
      </Link>

      {/* If you add Facebook later, you can drop another row here */}
      {/* 
      <Link
        href="/u/oauth/facebook/start"
        className="
          flex w-full items-center justify-center gap-2
          rounded-md border border-slate-200 bg-white
          px-4 py-2.5 text-sm font-medium text-slate-700
          shadow-sm hover:bg-slate-50 hover:border-slate-300
          transition-colors
        "
      >
        <FaFacebook className="h-4 w-4" aria-hidden="true" />
        <span>Continue with Facebook</span>
      </Link>
      */}
    </div>
  );
}
