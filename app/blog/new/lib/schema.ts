// app/blog/new/schema.ts
import z from "zod";
import { PostStatus } from "../../lib/definitions";
import { CATEGORY_MAP } from "../../lib/helper";

const allowedCategoryIds = Object.keys(CATEGORY_MAP).map(Number); // [1,2,3,4]
const STATUS_VALUES = [
  "draft",
  "published",
  "archived",
] as const satisfies readonly PostStatus[];

// Helper to handle "true"/"false", "on", 1/0, undefined
const checkboxBoolean = z
  .union([z.boolean(), z.string(), z.number(), z.undefined()])
  .transform((val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val === 1;
    if (typeof val === "string") {
      const lower = val.toLowerCase();
      return lower === "true" || lower === "1" || lower === "on";
    }
    // undefined → false
    return false;
  });

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

  // ✔️ now robust for checkboxes / hidden field
  isFeatured: checkboxBoolean,
  isRtl: checkboxBoolean,

  // datetime-local will submit a string like "2025-11-18T11:30"
  eventDate: z.string().optional().nullable(),

  eventLocation: z.string().trim().optional().nullable(),
});
