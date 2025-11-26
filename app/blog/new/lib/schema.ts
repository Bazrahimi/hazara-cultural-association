// app/blog/new/schema.ts
import z from "zod";
import { CATEGORY_MAP } from "../../lib/helper";
import { PostStatus } from "../../lib/definitions";

const allowedCategoryIds = Object.keys(CATEGORY_MAP).map(Number); // [1,2,3,4]
const STATUS_VALUES= ["draft", "published", "archived"] as const satisfies readonly PostStatus[];

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

  content_html: z
    .string()
    .min(20, "Content is required and must be at least 10 characters."),

  category_id: z.coerce
    .number()
    .int()
    .refine((val) => allowedCategoryIds.includes(val), {
      message: "Invalid category",
    }),

  status: z.enum(STATUS_VALUES).default("published"),

  hero_img_path: z.string().trim().optional().nullable(),

  // ✔️ now robust for checkboxes / hidden field
  is_featured: checkboxBoolean,
  is_rtl: checkboxBoolean,

  // datetime-local will submit a string like "2025-11-18T11:30"
  event_date: z.string().optional().nullable(),

  event_location: z.string().trim().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;

export type BlogPostState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof BlogPostInput, string[]>>;
  data?: Partial<BlogPostInput>;
  slug?: string;
};
