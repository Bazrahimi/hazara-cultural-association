// app/components/VideoGallery.tsx
"use client";

import {
  cldPosterFromVideo,
  cldWithTransforms,
  mimeFromExt,
} from "../util/helper";

import {  VideoGallery } from "../util/definitions";

export default function VideoGalleries({
  videos,
  overlaySource = true, // show tiny top-left badge
}: {
  videos: VideoGallery[];
  overlaySource?: boolean;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {videos.map((v, i) => {
        const src = cldWithTransforms(v.src, "vc_auto,q_auto"); // smart codec + quality
        const poster = cldPosterFromVideo(v.src, v.posterSecond ?? 2);
        const type = mimeFromExt(v.src);

        return (
          <figure
            key={v.src + i}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
          >
            {/* Source badge */}
            {overlaySource && v.source && (
              <div className="pointer-events-none absolute left-2 top-2 z-10">
                <span className="inline-block max-w-[75%] truncate rounded bg-gray-200/95 px-2 py-0.5 text-[10px] font-medium text-gray-800 ring-1 ring-black/5 backdrop-blur-sm shadow-sm">
                  {v.source}
                </span>
              </div>
            )}

            <div className="relative aspect-video w-full bg-black">
              <video
                controls
                preload="metadata"
                poster={poster}
                className="absolute inset-0 h-full w-full object-contain bg-black"
              >
                <source src={src} type={type} />
                {/* Fallback text */}
                Your browser does not support the video tag.
              </video>
            </div>

            {(v.caption || (!overlaySource && v.source)) && (
              <figcaption className="px-4 py-3">
                {v.caption && (
                  <p className="text-sm text-gray-800">{v.caption}</p>
                )}
                {!overlaySource && v.source && (
                  <p className="mt-1 text-[11px] italic text-gray-500">
                    {v.source}
                  </p>
                )}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
