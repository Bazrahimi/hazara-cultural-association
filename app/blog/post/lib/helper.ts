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
