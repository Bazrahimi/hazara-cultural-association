// components/CldFileUpload.tsx
"use client";
import Spinner from "../skeleton/spinner";

import { cldLogoSharp } from "@/app/_lib/cloudinary";
import { useBodyScrollLock } from "@/app/_ui/hooks/useBodyScrollLock";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Image from "next/image";
import * as React from "react";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";

const SIGNATURE_ENDPOINT = "/api/cloudinary";

type Props = {
  title: string;
  uploadPreset: string;
  value: string; // Cloudinary PATH like "v123/folder/file.png"
  onChange: (path: string) => void;
  allowedFormats?: string[];
  resourceType?: "image" | "video" | "raw";
};

export default function CldFileUpload({
  title,
  uploadPreset,
  value,
  onChange,
  allowedFormats = ["jpg", "jpeg", "png", "webp", "heic"],
  resourceType = "image",
}: Props) {
  const [removing, setRemoving] = React.useState(false);
  const [removeError, setRemoveError] = React.useState<string | null>(null);
  const [widgetOpen, setWidgetOpen] = React.useState(false);

  // 🔒 freeze body when the Cloudinary widget is open
  useBodyScrollLock(widgetOpen);

  // extra safety: always unlock on unmount
  React.useEffect(() => () => setWidgetOpen(false), []);

  async function handleRemove() {
    try {
      setRemoving(true);
      setRemoveError(null);
      if (!value) throw new Error("No image to remove.");
      const res = await fetch("/api/cloudinary/destroy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ path: value, resourceType }),
      });
      const ct = res.headers.get("content-type") || "";
      const json = ct.includes("application/json")
        ? await res.json()
        : { ok: false, message: await res.text() };
      if (!res.ok || !json?.ok)
        throw new Error(json?.message || `Failed with ${res.status}`);
      onChange("");
    } catch (e) {
      console.error(e);
      setRemoveError("Failed to remove image.");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="mt-2">
      {value ? (
        <div className="mt-3 flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded bg-gray-100">
            {cldLogoSharp(value) && (
              <Image
                src={cldLogoSharp(value)!}
                alt={title}
                fill
                sizes="64px"
                className="object-cover"
              />
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (!removing) handleRemove();
            }}
            disabled={removing}
            aria-busy={removing || undefined}
            className={[
              "inline-flex items-center gap-2 rounded-lg font-semibold shadow-md",
              "px-3 py-2 transition-transform duration-200 focus:outline-none focus:ring-4",
              "hover:scale-105 bg-red-600 text-white hover:bg-red-500 focus:ring-red-200",
              "disabled:opacity-60 disabled:hover:scale-100",
            ].join(" ")}
          >
            <FiTrash2 className="h-5 w-5" />
            {removing ? <Spinner /> : "Remove & upload new"}
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={uploadPreset}
          signatureEndpoint={SIGNATURE_ENDPOINT}
          options={{
            resourceType,
            clientAllowedFormats: allowedFormats,
            multiple: false,
            maxFiles: 1,
            sources: ["local", "url", "camera"],
            language: "en",
          }}
          onOpen={() => setWidgetOpen(true)}
          onClose={() => setWidgetOpen(false)}
          onError={() => setWidgetOpen(false)}
          onSuccess={(result) => {
            setWidgetOpen(false);
            const info = result?.info as CloudinaryUploadWidgetInfo | undefined;
            if (info?.path) onChange(info.path);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // never submit anything
                open();
              }}
              className={[
                "inline-flex items-center gap-2 rounded-lg font-semibold shadow-md",
                "px-3 py-2 transition-transform duration-200 focus:outline-none focus:ring-4",
                "hover:scale-105 border border-gray-300 text-gray-800 bg-white",
                "hover:bg-gray-50 focus:ring-blue-100",
              ].join(" ")}
              aria-label={`${title} image upload`}
            >
              <FiUploadCloud className="h-5 w-5" />
              {`${title} Image`}
            </button>
          )}
        </CldUploadWidget>
      )}

      {removeError && (
        <p
          className="mt-2 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {removeError}
        </p>
      )}
    </div>
  );
}
