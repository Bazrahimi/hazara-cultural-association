import { publicEnv } from "@/app/_lib/env/public";
import { serverEnv } from "@/app/_lib/env/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: publicEnv.cloudinaryCloudName,
  api_key: publicEnv.cloudinaryApiKey,
  api_secret: serverEnv.cloudinary.apiSecret,
});

type DestroyBody = {
  path?: string; // e.g. "v1755615/little-bamiyan/logo/abc123.png"
  resourceType?: "image" | "video" | "raw";
};

// Convert saved "path" -> Cloudinary public_id (strip version + extension)
function publicIdFromPath(pathIn: string): string {
  try {
    let p = (pathIn || "").trim();
    if (!p) return "";

    // handle accidental leading slash or querystring
    if (p.startsWith("/")) p = p.slice(1);
    const q = p.indexOf("?");
    if (q !== -1) p = p.slice(0, q);

    // split and drop version segment if present ("v123...")
    const parts = p.split("/");
    if (/^v\d+$/.test(parts[0] || "")) parts.shift();

    // remove extension from final segment
    const last = parts.pop() || "";
    const lastNoExt = last.replace(/\.[^./]+$/, "");
    parts.push(lastNoExt);

    return parts.join("/");
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  try {
    const { path, resourceType = "image" } = (await req.json()) as DestroyBody;

    if (!path || typeof path !== "string") {
      return NextResponse.json(
        { ok: false, message: "`path` is required." },
        { status: 400 },
      );
    }

    const publicId = publicIdFromPath(path);
    if (!publicId) {
      return NextResponse.json(
        { ok: false, message: "Could not derive public_id from path." },
        { status: 400 },
      );
    }

    // Optional safety: only allow deletes inside your folder.
    // Remove this if you truly want no restriction.
    const SAFE_PREFIX = "hca/";
    if (!publicId.startsWith(SAFE_PREFIX)) {
      return NextResponse.json(
        { ok: false, message: "Refused to delete outside allowed folder." },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Failed to destroy asset." },
      { status: 500 },
    );
  }
}
