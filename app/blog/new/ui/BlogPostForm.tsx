// app/blog/new/ui/BlogPostForm.tsx

"use client";

import CldFileUpload from "@/app/ui/global/CLdFileUpload";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useActionState, useEffect, useState } from "react";
import { type CategoryId } from "../../lib/helper";
import { ActionMode } from "../lib/definitions";
import type { BlogPostInput, BlogPostState } from "../lib/schema";
import CategoryStatusFeaturedFields from "./form/CategoryStatusFeaturedFields";
import FormHeader from "./form/FormHeader";

type Props = {
  mode: ActionMode;
  action: (
    prev: BlogPostState | undefined,
    formData: FormData
  ) => Promise<BlogPostState>;
  initialData?: Partial<BlogPostInput> & { id?: number };
};

// Helper: coerce unknown value to boolean
function toBoolean(raw: unknown): boolean {
  return (
    raw === true || raw === "true" || raw === 1 || raw === "1" || raw === "on" // just in case, from native inputs
  );
}

export default function BlogPostForm({ mode, action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState<
    BlogPostState | undefined,
    FormData
  >(action, undefined);

  // RTL toggle for Farsi / Hazaragi
  const [isRTL, setIsRTL] = useState<boolean>(() => {
    if (initialData?.is_rtl === undefined) return false; // default false
    return toBoolean(initialData.is_rtl);
  });

  // Controlled fields
  const [contentHTML, setContentHTML] = useState(
    initialData?.content_html ?? ""
  );
  const [heroImage, setHeroImage] = useState(initialData?.hero_img_path ?? "");

  // 🔹 Derive category from state or initialData (fallback 1 = news)
  const derivedCategoryId: CategoryId = Number(
    state?.data?.category_id ?? initialData?.category_id ?? 1
  ) as CategoryId;

  // Local state so the select is controlled immediately on change
  const [categoryId, setCategoryId] = useState<CategoryId>(derivedCategoryId);

  // Keep local categoryId in sync when server/initial data changes
  useEffect(() => {
    setCategoryId(derivedCategoryId);
  }, [derivedCategoryId]);

  // Sync from validation state for other controlled fields
  useEffect(() => {
    if (state?.data?.content_html !== undefined) {
      setContentHTML(state.data.content_html ?? "");
    }

    if (state?.data?.hero_img_path !== undefined) {
      setHeroImage(state.data.hero_img_path ?? "");
    }

    if (state?.data?.is_rtl !== undefined) {
      setIsRTL(toBoolean(state.data.is_rtl));
    }
  }, [state]);

  const isAdvocacyEvent = categoryId === 2;
  // Strip Quill's internal UI spans (like <span class="ql-ui">...</span>)
  function cleanQuillHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<span class="ql-ui"[^>]*><\/span>/g, "");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <FormHeader mode={mode} isRTL={isRTL} setIsRTL={setIsRTL} />

      {state?.message && state.ok === false && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <form action={formAction} className="space-y-6">
        {mode === "edit" && initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}

        {/* is_rtl is always sent as "true"/"false" */}
        <input type="hidden" name="is_rtl" value={isRTL ? "true" : "false"} />

        {/* Title */}
        <Input
          id="title"
          label={isRTL ? "عنوان مطلب" : "Title"}
          placeholder={
            isRTL
              ? "یک عنوان کوتاه برای مطلب خو نوشته کید"
              : "Enter a brief title for the post"
          }
          type="text"
          defaultValue={state?.data?.title ?? initialData?.title ?? ""}
          error={state?.errors?.title}
          required
          isRTL={isRTL}
        />

        {/* ✅ Extracted component */}
        <CategoryStatusFeaturedFields
          isRTL={isRTL}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          state={state}
          initialData={initialData}
          mode={mode}
        />

        {/* Event fields */}
        {isAdvocacyEvent && (
          <div
            className="grid gap-4 md:grid-cols-2"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div>
              <label className="text-sm font-medium text-gray-700">
                {isRTL ? "تاریخ و زمان برنامه" : "Event date & time"}
              </label>
              <input
                type="datetime-local"
                name="event_date"
                defaultValue={
                  (state?.data?.event_date as string | undefined) ??
                  (initialData?.event_date as string | undefined) ??
                  ""
                }
                className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
                  isRTL ? "text-right" : ""
                }`}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                {isRTL ? "محل برگزاری" : "Event location"}
              </label>
              <input
                name="event_location"
                defaultValue={
                  state?.data?.event_location ??
                  initialData?.event_location ??
                  ""
                }
                className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
                  isRTL ? "text-right" : ""
                }`}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <QuillEditor
          id="content"
          label={isRTL ? "متن مطلب" : "Content"}
          value={contentHTML}
          onChange={setContentHTML}
          placeholder={
            isRTL
              ? ""
              : "Write the body of your post here متن خبر یا اعلان خود را اینجا بنویسید"
          }
          isRTL={isRTL}
        />

        {/* Send cleaned HTML to the server */}
        <input
          type="hidden"
          name="content_html"
          value={cleanQuillHtml(contentHTML)}
        />

        {state?.errors?.content_html && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.content_html[0]}
          </p>
        )}

        {/* Hero image */}
        <CldFileUpload
          title={isRTL ? "آپلود تصویر" : "Upload Image"}
          uploadPreset="hca-blog-post-hero"
          onChange={setHeroImage}
          value={heroImage}
        />
        <input type="hidden" name="hero_img_path" value={heroImage} />

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {mode === "edit"
              ? isRTL
                ? "تغییرات شما فوراً به‌روز می‌شوند."
                : "Your changes will update immediately."
              : isRTL
                ? "بعداً می‌توانید نوشته‌ها را از پنل مدیریت ویرایش کنید."
                : "Posts can be edited later from the admin panel."}
          </p>
          <ActionButton
            type="submit"
            isLoading={isPending}
            overlay
            loadingText={mode === "edit" ? "Updating…" : "Saving…"}
          >
            {mode === "edit"
              ? isRTL
                ? "به‌روزرسانی مطلب"
                : "Update Post"
              : isRTL
                ? "ذخیره مطلب"
                : "Save Post"}
          </ActionButton>
        </div>
      </form>
    </div>
  );
}
