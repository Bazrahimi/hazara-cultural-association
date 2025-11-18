"use client";

import CldFileUpload from "@/app/ui/global/CLdFileUpload";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { Input } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import QuillEditor from "@/app/ui/global/QuillEditor";
import { useActionState, useState } from "react";
import { createBlogPost } from "../lib/action";

export default function BlogPost() {
  const [contentHTML, setContentHTML] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [state, formAction, isPending] = useActionState(
    createBlogPost,
    undefined
  );
  const [category, setCategory] = useState<
    "news" | "advocacy_event" | "announcement"
  >("news");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="mt-10 md:mt-5">
        <Header as="h1" size="md">
          Create New Blog Post
        </Header>
        <P>Share news, announcements, or advocacy events with the community.</P>
      </header>

      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <form action={formAction} className="space-y-6">
        <div className="space-y-5">
          <Input
            id="title"
            label="Title"
            placeholder="Enter a brief title for the post"
            type="text"
          />

          <div className="grid gap-4 grid-cols-3">
            <label className="block text-sm font-medium text-gray-700">
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
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="news">News</option>
              <option value="announcement">Announcement</option>
              <option value="advocacy_event">Advocacy event</option>
            </select>
          </div>

          {/* Meta: category, status, featured */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Status
              </span>
              <div className="mt-1 flex gap-3 text-sm">
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    defaultChecked
                    className="h-4 w-4"
                  />
                  Draft
                </label>
                <label className="inline-flex items-center gap-1">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    className="h-4 w-4"
                  />
                  Published
                </label>
              </div>
            </div>

            <div className="flex items-end">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" name="is_featured" className="h-4 w-4" />
                Featured on homepage
              </label>
            </div>
          </div>

          {/* Event-specific fields */}
          {category === "advocacy_event" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event date &amp; time
                </label>
                <input
                  type="datetime-local"
                  name="event_date"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event location
                </label>
                <input
                  name="event_location"
                  placeholder="City, venue, or address"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short excerpt
            </label>
            <textarea
              name="excerpt"
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Optional summary used in listings and cards."
            />
          </div>

          <QuillEditor
            id="content"
            label="Content"
            value={contentHTML}
            onChange={setContentHTML}
            placeholder="Write your article body here"
          />

          <input type="hidden" name="content_html" value={contentHTML} />
        </div>

        {/* Hero image */}
        <div>
          <CldFileUpload
            title="Upload Image"
            uploadPreset="hca-blog-post-hero"
            onChange={setHeroImage}
            value={heroImage}
          />
          <input type="hidden" value={heroImage} name="hero_img_path" />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Posts can be edited later from the admin panel.
          </p>
          <ActionButton
            type="submit"
            isLoading={isPending}
            overlay
            loadingText="Saving"
          >
            Save post
          </ActionButton>
        </div>
      </form>
    </div>
  );
}
