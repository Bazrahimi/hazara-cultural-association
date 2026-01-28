export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
export const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!;
export const apiSecret =
  process.env.CLOUDINARY_API_SECRET ||
  process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!;

// config

const CLD_BASE = `https://res.cloudinary.com/${cloudName}/image/upload`;

export function cld(
  path: string | null | undefined,
  transform: string
): string {
  if (!path) return "";

  // Fast path: you store "v123/dir/file.ext"

  const rel = path.startsWith("/") ? path.slice(1) : path;
  return `${CLD_BASE}/${transform}/${rel}`;
}

// convenience presets
export const cldCardHeroAuto = (u?: string | null) =>
  cld(u, "f_auto,q_auto:good,dpr_auto,ar_16:9,c_fill,g_auto,w_720");

export const cldLogoSharp = (u?: string | null) =>
  cld(u, "f_auto,q_auto,e_sharpen,dpr_auto,w_80,h_80,c_fill,g_auto");

// For detail pages: **no cropping**, keep full image
export const cldDetailHeroAuto = (u?: string | null) =>
  cld(u, "f_auto,q_auto:good,dpr_auto,c_fit,w_1200");

export const cldDetailHeroTinyBlur = (u?: string | null) =>
  cld(u, "f_auto,q_10,w_100,e_blur:1200,ar_16:9,c_fill,g_auto");
