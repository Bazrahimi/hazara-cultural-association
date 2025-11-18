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

  // 1) Controlled fields: prefer latest state.data, else initialData, else default
  const [contentHTML, setContentHTML] = useState(
    initialData?.content_html ?? ""
  );
  const [heroImage, setHeroImage] = useState(initialData?.hero_img_path ?? "");
  const [category, setCategory] = useState<
    "news" | "advocacy_event" | "announcement"
  >(initialData?.category ?? "news");

  // When validation fails, state.data will have the submitted values – sync them
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
  }, [state]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="mt-10 md:mt-5">
        <Header as="h1" size="md">
          {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
        </Header>
        <P>
          {mode === "create"
            ? "Share news, announcements, or advocacy events with the community."
            : "Update your content and publish changes."}
        </P>
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

        {/* Title */}
        <Input
          id="title"
          label="Title"
          placeholder="Enter a brief title for the post"
          type="text"
          defaultValue={state?.data?.title ?? initialData?.title ?? ""}
          error={state?.errors?.title}
          required
        />

        {/* Category + Status + Featured */}
        <div className="grid gap-4 md:grid-cols-3 items-end">
          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Category
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
              <option value="news">News</option>
              <option value="announcement">Announcement</option>
              <option value="advocacy_event">Advocacy event</option>
            </select>
            {state?.errors?.category && (
              <p className="text-xs text-red-600">{state.errors.category[0]}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Status
            </span>

            <div className="mt-1 flex gap-4 text-sm">
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
                Draft
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
                Published
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
                  Archived
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
              Featured on homepage
            </label>
          </div>
        </div>

        {/* Event fields */}
        {category === "advocacy_event" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Event date &amp; time
              </label>
              <input
                type="datetime-local"
                name="event_date"
                defaultValue={
                  (state?.data?.event_date as string | undefined) ??
                  (initialData?.event_date as string | undefined) ??
                  ""
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Event location
              </label>
              <input
                name="event_location"
                defaultValue={
                  state?.data?.event_location ??
                  initialData?.event_location ??
                  ""
                }
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <QuillEditor
          id="content"
          label="Content"
          value={contentHTML}
          onChange={setContentHTML}
        />
        <input type="hidden" name="content_html" value={contentHTML} />
        {state?.errors?.content_html && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.content_html[0]}
          </p>
        )}

        {/* Hero image */}
        <CldFileUpload
          title="Upload Image"
          uploadPreset="hca-blog-post-hero"
          onChange={setHeroImage}
          value={heroImage}
        />
        <input type="hidden" name="hero_img_path" value={heroImage} />

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {mode === "edit"
              ? "Your changes will update immediately."
              : "Posts can be edited later from the admin panel."}
          </p>
          <ActionButton
            type="submit"
            isLoading={isPending}
            overlay
            loadingText={mode === "edit" ? "Updating…" : "Saving…"}
          >
            {mode === "edit" ? "Update Post" : "Save Post"}
          </ActionButton>
        </div>
      </form>
    </div>
  );
}
