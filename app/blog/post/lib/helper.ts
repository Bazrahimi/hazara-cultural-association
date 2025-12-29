import type { PostInput } from "./schema";

export const POST_FIELDS = {
  // id: "id",
  title: "title",
  contentHtml: "contentHtml",
  excerpt: "excerpt",
  categoryId: "categoryId",
  statusCode: "statusCode",
  heroImgPath: "heroImgPath",
  isFeatured: "isFeatured",
  isRtl: "isRtl",
  eventDate: "eventDate",
  eventLocation: "eventLocation",
  createdAt: "createdAt",
} as const satisfies Record<keyof PostInput, keyof PostInput>;

export const POSTS_SECTION_GRID_CLASS =
  "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6";

  export const POST_CARD = {
  link:
    "group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md " +
    "focus-visible:ring-2 focus-visible:ring-hca-yellow-main focus-visible:ring-offset-2",
  article: "flex h-full flex-col p-1",
  media: "relative mt-auto h-44 w-full overflow-hidden",

  ctaOverlay:
    "absolute inset-x-0 bottom-0 flex items-center justify-center " +
    "bg-hca-yellow-dark/80 group-hover:bg-hca-yellow-main px-3 py-2 backdrop-blur-sm",

  ctaText: "text-xs font-semibold text-white text-center",
};