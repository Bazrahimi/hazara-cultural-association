"use client";

import { IMAGE_DEFAULT_BLUR } from "@/app/_ui/ImageShimer";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type ImageItem = {
  src: string;
  alt: string;
  caption?: string;
  source?: string | { label: string; href?: string };
};

export default function ImageGallery({
  images,
  defaultSource,
  overlaySource = true,
}: {
  images: ImageItem[];
  defaultSource?: ImageItem["source"];
  /** show a small top-left badge with the source on images */
  overlaySource?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (index !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [index]);

  const renderSourceNode = (src?: ImageItem["source"]) => {
    if (!src) return null;
    if (typeof src === "string") return src;
    return src.label;
  };

  const renderSourceLink = (src?: ImageItem["source"]) => {
    if (!src) return null;
    if (typeof src === "string") return <span>{src}</span>;
    if (src.href) {
      return (
        <a
          href={src.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {src.label}
        </a>
      );
    }
    return <span>{src.label}</span>;
  };

  return (
    <>
      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((img, i) => {
          const credit = img.source ?? defaultSource;
          const creditText = renderSourceNode(credit);
          return (
            <figure
              key={img.src}
              className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              onClick={() => open(i)}
            >
              <div className="relative h-64 w-full sm:h-72 md:h-80">
                {/* Top-left watermark/credit badge */}
                {overlaySource && creditText && (
                  <div className="pointer-events-none absolute left-2 top-2 z-10">
                    <span
                      className="inline-block max-w-[75%] truncate rounded px-2 py-0.5 text-[10px] font-medium text-gray-800 shadow-sm
                                 bg-gray-200/95 backdrop-blur-sm ring-1 ring-black/5"
                      title={
                        typeof creditText === "string" ? creditText : undefined
                      }
                    >
                      {creditText}
                    </span>
                  </div>
                )}

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

              {(img.caption || credit) && (
                <figcaption className="px-4 py-3">
                  {img.caption && (
                    <p className="text-sm text-gray-800">{img.caption}</p>
                  )}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Close (top-right) */}
          <button
            ref={closeBtnRef}
            onClick={close}
            aria-label="Close (Esc)"
            title="Close (Esc)"
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80"
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
            Close
          </button>

          {/* Prev / Next */}
          <button
            onClick={showPrev}
            aria-label="Previous image"
            title="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80 md:left-4"
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
              {/* Lightbox top-left badge */}
              {overlaySource && (images[index].source ?? defaultSource) && (
                <div className="pointer-events-none absolute left-2 top-2 z-10">
                  <span
                    className="inline-block max-w-[60vw] truncate rounded px-2 py-0.5 text-[11px] font-medium text-gray-800 shadow-sm
                               bg-gray-200/95 backdrop-blur-sm ring-1 ring-black/5"
                    title={
                      typeof renderSourceNode(
                        images[index].source ?? defaultSource
                      ) === "string"
                        ? (renderSourceNode(
                            images[index].source ?? defaultSource
                          ) as string)
                        : undefined
                    }
                  >
                    {renderSourceNode(images[index].source ?? defaultSource)}
                  </span>
                </div>
              )}

              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {(images[index].caption ||
              images[index].source ||
              defaultSource) && (
              <div className="mt-3 text-center">
                {images[index].caption && (
                  <p className="text-sm text-white/95">
                    {images[index].caption}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-white/75 italic">
                  {renderSourceLink(images[index].source ?? defaultSource)}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={showNext}
            aria-label="Next image"
            title="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80 md:right-4"
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
