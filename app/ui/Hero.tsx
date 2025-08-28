// app/components/Hero.tsx
"use client";

import { inter, roboto } from "@/app/lib/font";
import { clsx } from "clsx";
import Image from "next/image";
import { IMAGE_DEFAULT_BLUR } from "./global/ImageShimer";

const heroImg = "/images/hero/hero2.png";

const Hero = () => {
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
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL={IMAGE_DEFAULT_BLUR}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Content anchored bottom */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-4 pb-12 text-center">
        {/* Glassy logo badge */}
        <div className="relative rounded-2xl bg-white/20 p-3 shadow-lg ring-1 ring-white/30 backdrop-blur mb-4">
          <div className="relative h-[clamp(6rem,8vw,8rem)] w-[clamp(6rem,8vw,8rem)]">
            <Image
              src="/logo-hca-mark.png"
              alt="Hazara Cultural Association logo"
              fill
              sizes="10rem"
              className="object-contain drop-shadow"
              priority
            />
          </div>
        </div>

        {/* Glassy text card */}
        <div className="mt-2 rounded-2xl bg-white/20 px-6 py-4 shadow-lg ring-1 ring-white/30 backdrop-blur">
          {/* Heading */}
          <h1
            id="hero-title"
            className={clsx(
              inter.className,
              "text-2xl font-bold sm:text-3xl lg:text-4xl text-white drop-shadow"
            )}
          >
            Hazara Cultural Association
          </h1>

          {/* Slogan */}
          <p
            className={clsx(
              roboto.className,
              "mt-2 mx-auto max-w-2xl text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-gray-100 drop-shadow"
            )}
          >
            Revival of Hazara heritage — strengthening community, and advocating
            for justice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
