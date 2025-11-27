import { toBoolean } from "@/app/lib/helper";
import type { BlogPostInput, BlogPostState, ParseResult } from "./definitions";
import { BlogPostSchema } from "./schema";

export const parseBlogPostForm = (formData: FormData): ParseResult => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = BlogPostSchema.safeParse(raw);

  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  const fieldErrors: BlogPostState["errors"] = {};

  for (const issue of parsed.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string") {
      const key = field as keyof BlogPostInput;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key]!.push(issue.message);
    }
  }

  const normalizedData: Partial<BlogPostInput> = {
    title: (raw.title as string) ?? "",
    contentHtml: (raw.contentHtml as string) ?? "",
    heroImgPath: (raw.heroImgPath as string) ?? "",
    eventDate: (raw.eventDate as string) ?? undefined,
    eventLocation: (raw.eventLocation as string) ?? undefined,
    categoryId: raw.categoryId ? Number(raw.categoryId as string) : undefined,
    status: (raw.status as BlogPostInput["status"]) ?? "draft",
    isFeatured: toBoolean(raw.isFeatured),
    isRtl: toBoolean(raw.isRtl),
  };

  return { ok: false, errors: fieldErrors, normalizedData };
};
