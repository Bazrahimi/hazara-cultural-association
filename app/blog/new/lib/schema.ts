// app/blog/new/schema.ts
import z from "zod";

const CATEGORY_VALUES = ["news", "advocacy_event", "announcement"] as const;
const STATUS_VALUES = ["draft", "published", "archived"] as const; // you can add scheduled/archived later

export const BlogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title is required and must be at least 3 characters")
    .max(120, "Title must be under 120 characters"),


  content_html: z.string().min(10, "Content is required"),

  category: z.enum(CATEGORY_VALUES, "Category is required"),

  status: z.enum(STATUS_VALUES).default("draft"),

  hero_img_path: z.string().trim().optional().nullable(),

  is_featured: z.coerce.boolean().default(false),
  is_rtl: z.coerce.boolean().default(false), 

  // datetime-local will submit a string like "2025-11-18T11:30"
  // we'll turn it into Date in the action
  event_date: z.string().optional().nullable(),

  event_location: z.string().trim().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;

export type BlogPostState = {
  ok?: boolean;
  message?: string;
  errors?: Partial<Record<keyof BlogPostInput, string[]>>;
  data?: Partial<BlogPostInput>;
};
