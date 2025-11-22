// app/blog/ui/HeroImage.tsx
import Image from "next/image";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";

type HeroImageProps = {
  src: string | null;
  alt: string;
  categoryId: number;
};

export default function HeroImage({ src, alt, categoryId }: HeroImageProps) {
  // ❌ Do not show hero image for category 99 (external links)
  if (!src || categoryId === 99) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
      <div className="relative h-64 w-full sm:h-80">
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
    </div>
  );
}
