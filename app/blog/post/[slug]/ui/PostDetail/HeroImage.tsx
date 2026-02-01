import { cldDetailHeroAuto } from "@/app/_lib/cloudinary";
import { IMAGE_DEFAULT_BLUR } from "@/app/_ui/ImageShimer";
import Image from "next/image";

export type HeroImageProps = {
  src: string | null;
  alt: string;
  onClick?: () => void;
  isClickable?: boolean;
};

export default function HeroImage({
  src,
  alt,
  onClick,
  isClickable = false,
}: HeroImageProps) {
  if (!src) return null;

  return (
    <figure className="mb-10 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={!isClickable}
        aria-label={isClickable ? "View image" : undefined}
        className={[
          "relative w-full max-w-3xl overflow-hidden rounded-2xl shadow-sm transition",
          isClickable ? "cursor-zoom-in hover:shadow-md" : "cursor-default",
          !isClickable ? "pointer-events-none" : "",
        ].join(" ")}
      >
        <div className="relative aspect-[16/9] bg-black">
          <Image
            src={cldDetailHeroAuto(src)}
            alt={alt}
            fill
            placeholder="blur"
            blurDataURL={IMAGE_DEFAULT_BLUR}
            className="object-contain"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        </div>
      </button>
    </figure>
  );
}
