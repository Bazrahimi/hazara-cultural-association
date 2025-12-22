import { CATEGORY_MAP, CategoryId } from "./category";

function escapeSvgText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const cardImgPlaceholder = (categoryId: CategoryId, isRTL: boolean) => {
  const category = CATEGORY_MAP[categoryId];
  if (!category) {
    console.warn("Invalid categoryId:", categoryId);
    return "";
  }

  const w = 800;
  const h = 400;

  const label = isRTL ? category.rtl : category.en;
  const safeLabel = escapeSvgText(label);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${category.theme.from}" />
      <stop offset="100%" stop-color="${category.theme.to}" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#g)" rx="24" ry="24"/>

  <circle cx="${w * 0.18}" cy="${h * 0.35}" r="${h * 0.35}" fill="rgba(255,255,255,0.10)" />
  <circle cx="${w * 0.85}" cy="${h * 0.85}" r="${h * 0.35}" fill="rgba(15,23,42,0.22)" />

  <text x="12%" y="48%" font-size="96" dominant-baseline="middle" text-anchor="middle">
    ${category.theme.icon}
  </text>

  <text x="${isRTL ? "90%" : "30%"}"
        y="${h * 0.32}"
        text-anchor="${isRTL ? "end" : "start"}"
        font-family="-apple-system, Segoe UI, Inter, system-ui, sans-serif"
        font-weight="600"
        font-size="26"
        fill="#e5e7eb">
    ${safeLabel}
  </text>
</svg>
`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export type SlugInfo = {
  title: string;
  postId: number;
}

export const extractPostFromSlug = (
  param: string
): SlugInfo | null => {
  if (!param) return null;

  const match = param.match(/^(.*)-(\d+)$/);
  if (!match) return null;

  const [, rawTitle, postIdStr] = match;

  const postId = Number(postIdStr);
  if (!Number.isInteger(postId) || postId <= 0) return null;

  const title = decodeURIComponent(rawTitle).replace(/-/g, " ").trim();

  return { postId, title };
};

export function truncateTitle(text: string, maxChar = 4) {
  if (text.length <= maxChar) {
    return text.trim().replace(/-/g, " ");
  }

  return (
    text
      .slice(0, maxChar)

      .replace(/-/g, " ") + "..."
  );
}
