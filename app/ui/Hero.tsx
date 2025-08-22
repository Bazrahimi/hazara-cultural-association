// app/components/Hero.tsx
import Image from "next/image";

type HeroProps = {
  /** Background image path under /public (e.g. /images/hero.jpg) */
  bgSrc?: string;
  /** Center icon path under /public (PNG/SVG with transparency) */
  iconSrc?: string;
  /** Optional heading/subheading content */
  children?: React.ReactNode;
};

const Hero = ({
  bgSrc = "/images/hero/Batoor_004.jpeg",
  iconSrc = "/logo-hca-mark.png",
  children,
}: HeroProps) => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image (blurred) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          className="object-cover  scale-110"
          sizes="100vw"
        />
      </div>

      {/* Three-color vertical overlay: sky (top) → white → yellow (bottom) */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-blue-500/60 via-white/70 to-yellow-400/70
        "
      />

      {/* Content container */}
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[70vh] lg:min-h-[80vh]">
        {/* Center transparent icon */}
        <div className="relative mb-6 h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
          <Image
            src={iconSrc}
            alt="HCA logo"
            fill
            className="object-contain opacity-90 drop-shadow-md"
            sizes="10rem"
            priority
          />
        </div>

        {/* Optional heading/subheading passed as children */}
        {children ? (
          <div className="space-y-3 text-slate-800">
            {children}
          </div>
        ) : (
          <div className="space-y-3 text-slate-800">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Hazara Cultural Association
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-base">
              Preserving culture, supporting community, and advocating for justice.
            </p>
          </div>
        )}
      </div>

      {/* Soft top/bottom fade for nicer edges (optional) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/60 to-transparent" />
    </section>
  );
};

export default Hero;
