import type { PostInput } from "./schema";

export const POST_FIELDS = {
  // id: "id",
  title: "title",
  contentHtml: "contentHtml",
  categoryId: "categoryId",
  statusCode: "statusCode",
  heroImgPath: "heroImgPath",
  isFeatured: "isFeatured",
  isRtl: "isRtl",
  eventDate: "eventDate",
  eventLocation: "eventLocation",
  createdAt: "createdAt",
} as const satisfies Record<keyof PostInput, keyof PostInput>;

