import { toBoolean } from "@/app/lib/helper";

import { POST_STATUS, StatusCode } from "../../../post/lib/definitions";
import type { ParseResult, PostInput, PostState } from "./schema";
import { BlogPostSchema } from "./schema";

export const parseBlogPostForm = (formData: FormData): ParseResult => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = BlogPostSchema.safeParse(raw);

  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  const fieldErrors: PostState["errors"] = {};

  for (const issue of parsed.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string") {
      const key = field as keyof PostInput;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key]!.push(issue.message);
    }
  }
  const rawStatusCode = raw.statusCode;

  const normalizedData: Partial<PostInput> = {
    title: (raw.title as string) ?? "",
    contentHtml: (raw.contentHtml as string) ?? "",
    heroImgPath: (raw.heroImgPath as string) ?? "",
    eventDate: (raw.eventDate as string) ?? undefined,
    eventLocation: (raw.eventLocation as string) ?? undefined,
    categoryId: raw.categoryId ? Number(raw.categoryId as string) : undefined,
    statusCode: [
      POST_STATUS.DRAFT,
      POST_STATUS.PUBLISHED,
      POST_STATUS.ARCHIVED,
    ].includes(Number(rawStatusCode) as StatusCode)
      ? (Number(rawStatusCode) as StatusCode)
      : POST_STATUS.PUBLISHED,

    isFeatured: toBoolean(raw.isFeatured),
    isRtl: toBoolean(raw.isRtl),
  };

  return { ok: false, errors: fieldErrors, normalizedData };
};
