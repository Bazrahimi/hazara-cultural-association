import { toBoolean } from "@/app/lib/helper";

import { POST_STATUS, StatusCode, PostAuthCtx } from "./definitions";
import type { ParseResult, PostInput, PostState } from "./schema";
import { PostSchema } from "./schema";
import { toggleFeatured, setStatusCode, deletePost } from "./data";

export const parseBlogPostForm = (formData: FormData): ParseResult => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = PostSchema.safeParse(raw);

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
      POST_STATUS.DRAFTED,
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

export type PostActionIntent = "publish" | "archive" | "delete" | "feature";
export const parsePostActionIntent = (
  formData: FormData
): PostActionIntent | null => {
  const v = formData.get("intent");
  if (v === "publish" || v === "archive" || v === "delete" || v === "feature")
    return v;
  return null;
};

export type PostActionState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const postFailure = (
  message: string,
  extra: Partial<Omit<PostActionState, "ok" | "message">> = {}
): PostActionState => {
  return { ok: false, message, ...extra };
};

export const postSuccess = (
  message: string,
  extra: Partial<Omit<PostActionState, "ok" | "message">> = {}
): PostActionState => {
  return { ok: true, message, ...extra };
};

export async function applyPostIntent(ctx: PostAuthCtx, intent: PostActionIntent) {
  switch (intent) {
    case "feature": {
      const isFeatured = await toggleFeatured(ctx);
      return { kind: "feature" as const, isFeatured };
    }
    case "publish": {
      const status = await setStatusCode(ctx, POST_STATUS.PUBLISHED);
      return { kind: "publish" as const, status };
    }
    case "archive": {
      const status = await setStatusCode(ctx, POST_STATUS.ARCHIVED);
      return { kind: "archive" as const, status };
    }
    case "delete": {
      const id = await deletePost(ctx);
      return { kind: "delete" as const, id };
    }
  }
}