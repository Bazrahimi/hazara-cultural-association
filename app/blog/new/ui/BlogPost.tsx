"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createBlogPost, type CreatePostState } from "../lib/action";

const initialState: CreatePostState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save post"}
    </button>
  );
}

export default function BlogPost() {
  const [state, formAction] = useActionState(createBlogPost, initialState);
  const [category, setCategory] = useState<
    "news" | "advocacy_event" | "announcement"
  >("news");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">New blog post</h1>
        <p className="mt-1 text-sm text-gray-500">
          Share news, announcements, or advocacy events with the community.
        </p>
      </header>

      {state.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <form action={formAction} className="space-y-6">
        {/* Title + slug */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug (optional)
            </label>
            <input
              name="slug"
              placeholder="auto-generated from title"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Meta: category, status, featured */}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
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

        {/* Hero image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hero image path (Cloudinary URL or path)
          </label>
          <input
            name="hero_img_path"
            placeholder="e.g. hca/blog/2025/hazara-memorial.jpg"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content_html"
            rows={12}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Write your article body here. For now you can paste HTML or plain text."
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Posts can be edited later from the admin panel.
          </p>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
