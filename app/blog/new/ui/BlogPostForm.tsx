// app/blog/new/ui/BlogPostForm.tsx

"use client";

import CldFileUpload from "@/app/ui/global/CLdFileUpload";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useActionState, useEffect, useState } from "react";
import { CATEGORY_MAP, type CategoryId } from "../../lib/helper";
import type { BlogPostInput, BlogPostState } from "../lib/schema";

type Props = {
  mode: "create" | "edit";
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
  console.log(initialData);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="mt-10 md:mt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <Header as="h1" size="md">
              {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
            </Header>
            <P>
              {mode === "create"
                ? "Share news, announcements, or advocacy events with the community."
                : "Update your content and publish changes."}
            </P>
          </div>

          {/* RTL / Farsi toggle */}
          <label className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700 md:mt-0">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isRTL}
              onChange={(e) => setIsRTL(e.target.checked)}
            />
            <span className="font-extrabold">فارسی / هزارگی</span>
          </label>
        </div>
      </header>

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

        {/* Category + Status + Featured */}
        <div
          className={`grid items-end gap-4 md:grid-cols-3 ${
            isRTL ? "text-right" : ""
          }`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              {isRTL ? "دسته‌بندی" : "Category"}
            </label>
            <select
              name="category_id"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(Number(e.target.value) as CategoryId)
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {(Object.keys(CATEGORY_MAP) as unknown as CategoryId[]).map(
                (id) => (
                  <option key={id} value={id}>
                    {isRTL ? CATEGORY_MAP[id].rtl : CATEGORY_MAP[id].en}
                  </option>
                )
              )}
            </select>
            {state?.errors?.category_id && (
              <p className="text-xs text-red-600">
                {state.errors.category_id[0]}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <span className="block text-sm font-medium text-gray-700">
              {isRTL ? "وضعیت" : "Status"}
            </span>

            <div className="mt-1 flex flex-wrap gap-4 text-sm">
              {/* Draft */}
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  defaultChecked={
                    (state?.data?.status ?? initialData?.status ?? "draft") ===
                    "draft"
                  }
                  className="h-4 w-4"
                />
                {isRTL ? "پیش‌نویس" : "Draft"}
              </label>

              {/* Published */}
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  defaultChecked={
                    (state?.data?.status ?? initialData?.status) === "published"
                  }
                  className="h-4 w-4"
                />
                {isRTL ? "منتشر شده" : "Published"}
              </label>

              {/* Archived — ONLY for edit mode */}
              {mode === "edit" && (
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value="archived"
                    defaultChecked={
                      (state?.data?.status ?? initialData?.status) ===
                      "archived"
                    }
                    className="h-4 w-4"
                  />
                  {isRTL ? "آرشیو شده" : "Archived"}
                </label>
              )}
            </div>

            {state?.errors?.status && (
              <p className="text-xs text-red-600">{state.errors.status[0]}</p>
            )}
          </div>

          {/* Featured */}
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="is_featured"
                className="h-4 w-4"
                defaultChecked={
                  state?.data?.is_featured ?? initialData?.is_featured ?? false
                }
              />
              {isRTL ? "نمایش در صفحه اصلی" : "Featured on homepage"}
            </label>
          </div>
        </div>

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
        <input type="hidden" name="content_html" value={contentHTML} />
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
