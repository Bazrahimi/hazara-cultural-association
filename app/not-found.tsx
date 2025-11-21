// app/not-found.tsx
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";
import { Button } from "./ui/global/components";
import { P } from "./ui/global/paragraph";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-16 text-center text-slate-800">
      {/* Logo */}
      <Image
        src="/images/logo-transparent-hd.png"
        alt="Hazara Cultural Association Logo"
        width={200}
        height={240}
        className="mb-6 opacity-90"
        priority
      />

      {/* Headline */}
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h1>

      {/* Main message */}
      <P className="max-w-lg text-sm text-slate-700 mb-4">
        Sorry — the page you’re looking for doesn’t exist. It might have been
        removed, moved, or is temporarily unavailable.
      </P>

      {/* Temporary maintenance note */}
      <div className="mb-6 max-w-md rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
        <p className="font-medium">🚧 Temporary Notice</p>
        <p>
          If this page is unavailable due to maintenance, please navigate back
          to the homepage and try again later.
        </p>
      </div>

      {/* Hazaragi translation */}
      <P className="max-w-lg text-sm text-slate-600 mb-8 leading-7" dir="rtl">
        صفحه پیدا نشد. امکان دارد این صفحه تغییر کرده، حذف شده باشد یا به طور
        موقت در دسترس نباشد. اگر صفحه به خاطر کارهای نگهداری بسته باشد، لطفاً به
        صفحهٔ اصلی بروید و دوباره کوشش کنید.
      </P>

      {/* Back button */}
      <Button as="link" href="/" className="flex items-center gap-2">
        <HiArrowLeft className="text-lg" />
        Back to Home
      </Button>
    </main>
  );
}
