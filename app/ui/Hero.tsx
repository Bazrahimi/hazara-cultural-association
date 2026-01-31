// app/components/Hero.tsx
"use client";

import { lusitana } from "@/app/_lib/font";
import { clsx } from "clsx";
import Image from "next/image";
import { ORG_PROFILE } from "../_lib/org/profile";
import { MemberRoutes } from "../_lib/routes";
import { IMAGE_DEFAULT_BLUR } from "./global/ImageShimer";
import { Button } from "./global/components";

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
        alt="Buddha of Bamiyan Image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_62%]"
        placeholder="blur"
        blurDataURL={IMAGE_DEFAULT_BLUR}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Logo inside niche */}
      <Image
        src={ORG_PROFILE.logoUrl}
        alt={`Logo of ${ORG_PROFILE.orgName}`}
        className="
          absolute left-1/2
          top-[45%]
          sm:top-[42%]
          md:top-[41%]
          lg:top-[40%]
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
        priority
      />

      {/* CTA using Button component */}
      <Button
        as="link"
        href={MemberRoutes.join()}
        size="sm"
        className={`
                      absolute z-20 font-semibold shadow-md

                      /* Mobile: center above logo */
                      left-1/2 -translate-x-1/2
                      top-[calc(45%-180px)]
                      translate-y-[-20px]

                      /* Desktop: shift to the right of the logo */
                      md:top-[45%] 
                      md:-translate-y-1/2
                      md:left-[calc(50%+250px)]

                      /* Larger screens: add more spacing */
                      lg:left-[calc(50%+350px)]
                      xl:left-[calc(50%+360px)]
                      2xl:left-[calc(50%+380px)]
                    `}
      >
        Become a Member
      </Button>

      {/* Slogan container */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center px-4 pb-4 text-center">
        <div className="max-w-3xl rounded-2xl bg-white/30 px-5 py-4 shadow-lg ring-1 ring-white/50 backdrop-blur-md">
          <p
            id="hero-title"
            className={clsx(
              lusitana.className,
              "font-extrabold leading-snug text-gray-900 drop-shadow-sm",
              "text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.125rem,3vw,1.75rem)] md:text-[clamp(1.25rem,2.4vw,2rem)] lg:text-[clamp(1.375rem,2vw,2.25rem)] xl:text-[clamp(1.5rem,1.8vw,2.5rem)]",
            )}
          >
            <span className="text-hca-yellow-main">Social Cohesion</span>{" "}
            <span className="text-gray-200">
              {" "}
              — Building Community Strength
            </span>{" "}
            <span className="text-hca-blue-main">
              — Revival of Hazara Identity.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
