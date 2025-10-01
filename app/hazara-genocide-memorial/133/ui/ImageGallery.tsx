"use client";

import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { ImageGallery } from "../util/definitions";

export default function ImageGallery({ images }: { images: ImageGallery[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);

  const showPrev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? null : (i + images.length - 1) % images.length
      ),
    [images.length]
  );
  const showNext = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  // Keyboard controls
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, showPrev, showNext]);

  // Prevent background scroll when open
  useEffect(() => {
    if (index !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [index]);

  return (
    <>
      {/* Grid (thumbnails) */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            onClick={() => open(i)}
          >
            <div className="relative h-64 w-full sm:h-72 md:h-80">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                placeholder="blur"
                blurDataURL={IMAGE_DEFAULT_BLUR}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            {img.caption && (
              <figcaption className="px-4 py-3 text-sm text-gray-700">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close(); // click backdrop to close
          }}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Prev / Next */}
          <button
            onClick={showPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white md:left-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="relative w-full max-w-6xl">
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {images[index].caption && (
              <p className="mt-3 text-center text-sm text-white/90">
                {images[index].caption}
              </p>
            )}
          </div>

          <button
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white md:right-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
