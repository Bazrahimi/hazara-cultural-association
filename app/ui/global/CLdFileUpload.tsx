// components/CldFileUpload.tsx
"use client";

import { cldLogoSharp } from "@/app/lib/cloudinary";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Image from "next/image";
import * as React from "react";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import { Button } from "./components";
import Spinner from "./skeleton/spinner";

const SIGNATURE_ENDPOINT = "/api/cloudinary";

type Props = {
  title: string;
  uploadPreset: string; // your SIGNED preset
  value: string; // Cloudinary path WITHOUT leading slash, e.g. "v1755615/.../file.png"
  onChange: (path: string) => void; // we pass the Cloudinary `path` back
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

  async function handleRemove() {
    setRemoving(true);
    setRemoveError(null);
    try {
      if (!value) throw new Error("No image to remove.");
      const res = await fetch("/api/cloudinary/destroy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: value, resourceType }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.message || `Failed with ${res.status}`);
      }
      onChange(""); // clear field in your form
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
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              handleRemove();
            }}
            disabled={removing}
            className="inline-flex items-center gap-2"
          >
            <FiTrash2 />
            {removing ? <Spinner /> : "Remove & upload new"}
          </Button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={uploadPreset}
          signatureEndpoint={SIGNATURE_ENDPOINT}
          onSuccess={(result) => {
            const info = result?.info as CloudinaryUploadWidgetInfo | undefined;
            // The widget gives a nice `path`: "v123/folder/file.png"
            if (!info?.path) return;
            onChange(info.path);
          }}
          options={{
            resourceType,
            clientAllowedFormats: allowedFormats,
            multiple: false,
            maxFiles: 1,
            sources: ["local", "url", "camera"],
            language: "en",
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className="inline-flex items-center gap-2"
              size="sm"
            >
              <FiUploadCloud className="h-5 w-5" />
              {`${title} Image`}
            </Button>
          )}
        </CldUploadWidget>
      )}

      {removeError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {removeError}
        </p>
      )}
    </div>
  );
}
