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
        width={240}
        height={280}
        className="mb-6"
        priority
      />

      {/* Headline */}

      <P className="mt-2">
        Sorry, the page you’re looking for doesn’t exist. But don’t worry — you
        can always return home.
      </P>

      {/* Back button */}
      <Button as="link" href="/">
        <HiArrowLeft className="text-lg" />
        Back to Home
      </Button>
    </main>
  );
}
