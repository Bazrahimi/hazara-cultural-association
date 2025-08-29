// app/components/Hero.tsx
"use client";

import { lusitana } from "@/app/lib/font";
import { clsx } from "clsx";
import Image from "next/image";
import { IMAGE_DEFAULT_BLUR } from "./global/ImageShimer";

const heroImg = "/images/hero/hero2.png";

export default function Hero() {
  return (
    <section
      role="banner"
      aria-labelledby="hero-title"
      className="relative isolate h-[65vh] w-full"
    >
      {/* Background */}
      <Image
        src={heroImg}
        alt="Little Bamiyan Dandenong image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_62%]"
        placeholder="blur"
        blurDataURL={IMAGE_DEFAULT_BLUR}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Logo placed in the niche */}
      <Image
  src="/images/logo-transparent-hd.png"
  alt="Logo of Hazara Cultural Association"
  className="
    absolute left-1/2
    top-[45%]                /* base: move down a bit */
    sm:top-[42%]             /* adjust back up on small tablets */
    md:top-[41%]             /* fine tune for medium screens */
    lg:top-[40%]             /* desktop stays centered */
    -translate-x-1/2 -translate-y-1/2
    h-auto
    w-[clamp(18rem,60vw,28rem)]
    sm:w-[clamp(20rem,50vw,30rem)]
    md:w-[clamp(22rem,42vw,34rem)]
    lg:w-[clamp(24rem,36vw,38rem)]
    xl:w-[clamp(26rem,32vw,42rem)]
  "
  width={800}
  height={800}
  sizes="(max-width: 640px) 60vw,
         (max-width: 1024px) 50vw,
         (max-width: 1536px) 42vw,
         32vw"
  priority
/>


      {/* Bottom content pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center px-4 pb-3 text-center">
        <div className="max-w-3xl rounded-2xl bg-white/20 px-4 sm:px-6 py-3 sm:py-4 shadow-lg ring-1 ring-white/30 backdrop-blur">
          <p
            id="hero-title"
            className={clsx(
              lusitana.className,
              // Responsive, bigger typography using clamp + breakpoints
              "font-extrabold leading-snug text-gray-100",
              // base → xl font sizes
              "text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.125rem,3vw,1.75rem)] md:text-[clamp(1.25rem,2.4vw,2rem)] lg:text-[clamp(1.375rem,2vw,2.25rem)] xl:text-[clamp(1.5rem,1.8vw,2.5rem)]"
            )}
          >
            <span className="text-yellow-300">Revival of Hazara heritage</span>{" "}
            — strengthening community,{" "}
            <span className="text-blue-400">and advocating for justice.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
