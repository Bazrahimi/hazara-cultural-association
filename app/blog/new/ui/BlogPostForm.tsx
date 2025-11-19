// app/blog/new/ui/BlogPostForm.tsx

"use client";

import CldFileUpload from "@/app/ui/global/CLdFileUpload";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useActionState, useEffect, useState } from "react";
import type { BlogPostInput, BlogPostState } from "../lib/schema";

type Props = {
  mode: "create" | "edit";
  action: (
    prev: BlogPostState | undefined,
    formData: FormData
  ) => Promise<BlogPostState>;
  initialData?: Partial<BlogPostInput> & { id?: number };
};

export default function BlogPostForm({ mode, action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState<
    BlogPostState | undefined,
    FormData
  >(action, undefined);

  // RTL toggle for Farsi / Hazaragi
  const [isRTL, setIsRTL] = useState(false);

  // Controlled fields
  const [contentHTML, setContentHTML] = useState(
    initialData?.content_html ?? ""
  );
  const [heroImage, setHeroImage] = useState(initialData?.hero_img_path ?? "");
  const [category, setCategory] = useState<
    "news" | "advocacy_event" | "announcement"
  >(initialData?.category ?? "news");

  // Sync from validation state
  useEffect(() => {
    if (state?.data?.content_html !== undefined) {
      setContentHTML(state.data.content_html ?? "");
    }
    if (state?.data?.hero_img_path !== undefined) {
      setHeroImage(state.data.hero_img_path ?? "");
    }
    if (state?.data?.category) {
      setCategory(state.data.category);
    }

    // Optional: if you later add language/rtl to state.data, you can sync here
    // if (state?.data?.is_rtl !== undefined) {
    //   setIsRTL(!!state.data.is_rtl);
    // }
  }, [state]);

  const isAdvocacyEvent = category === "advocacy_event";

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

        {/* Optional: send a language/rtl hint to the server */}
        <input type="hidden" name="language" value={isRTL ? "fa" : "en"} />

        {/* Title */}
        <Input
          id="title"
          label={isRTL ? "عنوان مطلب" : "Title"}
          placeholder={
            isRTL
              ? "یک عنوان کوتاه برای نوشته بنویسید"
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
              name="category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as "news" | "advocacy_event" | "announcement"
                )
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="news">{isRTL ? "خبر" : "News"}</option>
              <option value="announcement">
                {isRTL ? "اعلان" : "Announcement"}
              </option>
              <option value="advocacy_event">
                {isRTL ? "برنامه" : "Advocacy event"}
              </option>
            </select>
            {state?.errors?.category && (
              <p className="text-xs text-red-600">{state.errors.category[0]}</p>
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
