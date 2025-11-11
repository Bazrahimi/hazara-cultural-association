// app/(blog)/news/add/AddNewsForm.tsx
"use client";

import { Button, Input } from "@/app/ui/global/components";
import { useActionState, useState } from "react";
import { createNews } from "../lib/action";

type AgendaItem = { text: string };

type newsOptions = {
  1: "Hazara Genocide";
  2: "Official Recognition of Hazara genocide advocacy";
  3: "Refugee and Advocacy";
  4: "Hazara resilience and achievement";
};

export default function CreateNewsForm() {
  const [state, formAction, isPending] = useActionState(createNews, undefined);
  const [agenda, setAgenda] = useState<AgendaItem[]>([{ text: "" }]);

  const addAgenda = () => setAgenda((a) => [...a, { text: "" }]);
  const removeAgenda = (idx: number) =>
    setAgenda((a) => a.filter((_, i) => i !== idx));
  const updateAgenda = (idx: number, val: string) =>
    setAgenda((a) => a.map((it, i) => (i === idx ? { text: val } : it)));

  return (
    <form action={formAction} className="space-y-6">
      {/* Title */}

      <Input
        id="title"
        label="title"
        type="text"
        placeholder="Enter the title of the news"
        defaultValue={state?.title}
        error={state?.errors?.title}
      />
      {/* Date & Location */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="date"
          type="date"
          label="Date"
          defaultValue={state?.date}
          error={state?.errors?.date}
        />
        <Input
          id="location"
          type="text"
          label="Location (Optional)"
          placeholder="Enter location "
          defaultValue={state?.location}
          error={state?.errors?.location}
        />
      </div>

      {/* Meeting With */}
      <Input
        id="meetingWith"
        type="text"
        label="Meeting with (Optional)"
        placeholder="meeting with"
        defaultValue={state?.meetingWith}
        error={state?.errors?.meetingWith}
      />

      {/* Summary */}
      <Input
        id="summary"
        type="text"
        label=" Summary (1–2 sentences)"
        placeholder="HCA met with the Federal Member for X to discuss refugee protections and the official recognition of the Hazara genocide."
      />

      {/* Agenda (dynamic list) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Agenda items
        </label>
        <div className="mt-2 space-y-2">
          {agenda.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                value={item.text}
                onChange={(e) => updateAgenda(idx, e.target.value)}
                placeholder={
                  idx === 0
                    ? "Official recognition of the Hazara genocide"
                    : "e.g., Permanent protection for refugees"
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {agenda.length > 1 && (
                <Button onClick={() => removeAgenda(idx)}>Remove</Button>
              )}
            </div>
          ))}
          <Button onClick={addAgenda}>+ Add item</Button>
        </div>
      </div>

      {/* Outcomes / Next steps */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Outcomes / Next steps
        </label>
        <textarea
          name="outcomes"
          rows={3}
          placeholder="MP committed to raise the issue in Parliament; follow-up meeting scheduled; request for submissions."
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Body (optional long text / markdown) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Details (optional)
        </label>
        <textarea
          name="body"
          rows={6}
          placeholder="Longer narrative, context, quotes, and any relevant links."
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Image URL (Cloudinary or other) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Main image URL
        </label>
        <input
          name="imageUrl"
          placeholder="https://res.cloudinary.com/<cloud>/image/upload/.../meeting.jpg"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Tip: paste a Cloudinary URL. You can add a caption in the “Details”.
        </p>
      </div>

      {/* Visibility */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            defaultValue="published"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            placeholder="advocacy, meeting, parliament"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          type="reset"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
