// app/blog/new/schema.ts
import { toBoolean } from "@/app/lib/helper";
import z from "zod";

import { CATEGORY_MAP } from "../../lib/category";
import {
  POST_STATUS,
  PostInsertUpdateSuccessDBReturn,
} from "../../post/lib/definitions";

const allowedCategoryIds = Object.keys(CATEGORY_MAP).map(Number); // [1,2,3,4]

const StatusCodeSchema = z
  .preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.union([
      z.literal(POST_STATUS.DRAFT),
      z.literal(POST_STATUS.PUBLISHED),
      z.literal(POST_STATUS.ARCHIVED),
    ])
  )
  .default(POST_STATUS.PUBLISHED);

export const BlogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title is required and must be at least 3 characters")
    .max(120, "Title must be under 120 characters"),

  contentHtml: z
    .string()
    .min(20, "Content is required and must be at least 20 characters."),

  categoryId: z.coerce
    .number()
    .int()
    .refine((val) => allowedCategoryIds.includes(val), {
      message: "Invalid category",
    }),

  statusCode: StatusCodeSchema,

  heroImgPath: z.string().trim().optional().nullable(),

  isFeatured: z.preprocess(toBoolean, z.boolean()),
  isRtl: z.preprocess(toBoolean, z.boolean()),

  // datetime-local will submit a string like "2025-11-18T11:30"
  eventDate: z.string().optional().nullable(),

  eventLocation: z.string().trim().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});
export type PostInput = z.infer<typeof BlogPostSchema>;

export type ParseResult =
  | {
      ok: true;
      data: PostInput;
    }
  | {
      ok: false;
      errors: PostState["errors"];
      normalizedData: Partial<PostInput>;
    };

export type PostState = {
  ok?: boolean;
  postTitle?: string;
  message?: string;
  errors?: Partial<Record<keyof PostInput, string[]>>;
  data?: Partial<PostInput>;
  success?: PostInsertUpdateSuccessDBReturn;
};
