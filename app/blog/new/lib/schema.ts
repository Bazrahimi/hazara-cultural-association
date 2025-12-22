// app/blog/new/schema.ts
import { toBoolean } from "@/app/lib/helper";
import z from "zod";
import { PostStatus } from "../../post/lib/definitions";
import { CATEGORY_MAP } from "../../lib/category";

const allowedCategoryIds = Object.keys(CATEGORY_MAP).map(Number); // [1,2,3,4]
const STATUS_VALUES = [
  "draft",
  "published",
  "archived",
] as const satisfies readonly PostStatus[];

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

  status: z.enum(STATUS_VALUES).default("published"),

  heroImgPath: z.string().trim().optional().nullable(),

  isFeatured: z.preprocess(toBoolean, z.boolean()),
  isRtl: z.preprocess(toBoolean, z.boolean()),

  // datetime-local will submit a string like "2025-11-18T11:30"
  eventDate: z.string().optional().nullable(),

  eventLocation: z.string().trim().optional().nullable(),
});
