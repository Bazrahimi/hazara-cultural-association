// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  "/images/hero/hero1.jpeg",
  "/images/hero/hero2.webp",
  "/images/hero/hero3.jpg",
];

type HeroProps = {
  children?: React.ReactNode;
  intervalMs?: number; // how long each image shows
  fadeMs?: number; // cross-fade duration
};

const Hero = ({ children, intervalMs = 5000, fadeMs = 1000 }: HeroProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroImages.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background images (cross-fade) */}
      <div className="absolute inset-0 -z-20">
        {heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={[
              "object-cover scale-110 absolute inset-0 transition-opacity",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ transitionDuration: `${fadeMs}ms` }}
          />
        ))}
      </div>

      {/* Three-color overlay (blue → white → yellow) */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-blue-500/60 via-white/70 to-yellow-400/70
        "
      />

      {/* Content */}
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[70vh] lg:min-h-[80vh]">
        {/* Center transparent icon */}
        <div className="relative mb-6 h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
          <Image
            src="/logo-hca-mark.png"
            alt="HCA logo"
            fill
            sizes="10rem"
            className="object-contain opacity-90 drop-shadow-md"
            priority
          />
        </div>

        {children ? (
          <div className="space-y-3 text-slate-800">{children}</div>
        ) : (
          <div className="space-y-3 text-slate-800">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Hazara Cultural Association
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-base">
              Reviving Hazara heritage, uplifting families, uniting communities,
              and standing for justice.
            </p>
          </div>
        )}
      </div>

      {/* Soft top/bottom fade (optional) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/60 to-transparent" />
    </section>
  );
};

export default Hero;
