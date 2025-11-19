// app/blog/[slug]/ui/ManagePostControls.tsx
"use client";

import { Button } from "@/app/ui/global/components";

import { toggleFeatured, updateStatus } from "../lib/action";
import { size } from "zod";

type Props = {
  postId: number;
  status: "draft" | "archived" | "published";
  isFeatured: boolean;
};

export function ManagePostControls({ postId, status, isFeatured }: Props) {
  const nextStatus = status === "archived" ? "published" : "archived";

  return (
    <div className="mt-8 border-t border-gray-100 pt-4 flex flex-wrap gap-3">
      {/* Feature / Remove from homepage */}
      <Button as="link" href={`/blog/myposts/edit/${postId}`} size="xs">
        Edit post
      </Button>
      <form action={toggleFeatured}>
        <input type="hidden" name="postId" value={postId} />
        <input
          type="hidden"
          name="feature"
          value={(!isFeatured).toString()}
        />
        <Button
          type="submit"
          size = 'xs'
          variant={isFeatured ? "danger" : "outline"}
        >
          {isFeatured ? "Remove from homepage" : "Feature on homepage"}
        </Button>
      </form>

      {/* Archive / Publish */}
      <form action={updateStatus}>
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="status" value={nextStatus} />
        <Button type="submit" size="xs" variant="outline">
          {status === "archived" ? "Publish post" : "Archive post"}
        </Button>
      </form>

      <p className="text-xs text-gray-500">
        Only you (author) or an admin can see these controls.
      </p>
    </div>
  );
}
