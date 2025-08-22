// app/not-found.tsx
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-16 text-center text-slate-800">
      {/* Logo */}
      <Image
        src="/images/logo-transparent-hd.png"
        alt="Hazara Cultural Association Logo"
        width={240}
        height={280}
        className="mb-6"
        priority
      />

      {/* Headline */}
     
      <p className="mt-2 max-w-md text-gray-600">
        Sorry, the page you’re looking for doesn’t exist. But don’t worry — you
        can always return home.
      </p>

      {/* Back button */}
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        <HiArrowLeft className="text-lg" />
        Back to Home
      </Link>
    </main>
  );
}
