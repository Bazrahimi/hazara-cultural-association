"use client";

import { cldDetailHeroAuto } from "@/app/_lib/cloudinary";
import { Button } from "@/app/_ui";
import { IMAGE_DEFAULT_BLUR } from "@/app/_ui/ImageShimer";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeroImage from "./HeroImage";

type Props = {
  src: string | null;
  alt: string;
};

export default function ClickableHeroImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // ✅ now it's safe to return early
  if (!src) return null;

  return (
    <>
      <HeroImage
        src={src}
        alt={alt}
        isClickable
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl bg-black shadow-lg">
              <Image
                src={cldDetailHeroAuto(src)}
                alt={alt}
                width={1600}
                height={900}
                placeholder="blur"
                blurDataURL={IMAGE_DEFAULT_BLUR}
                className="h-auto w-full max-h-[85vh] object-contain"
              />
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setOpen(false)}
                aria-label="Close image"
                variant="danger"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
