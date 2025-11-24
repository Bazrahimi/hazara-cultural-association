"use client";

import { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { useActionState } from "react";
import Link from "next/link";



import { publishPost, archivePost, deletePost} from "../lib/actions";

type Props = {
  isRTL: boolean;
  postId: number;
  slug: string;
  status: "draft" | "published" | "archived";
};

export default function PostActionsMenu({ isRTL, postId, slug, status }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Server action states
  const [publishing, publishAction] = useActionState(
    async () => publishPost(postId),
    undefined
  );

  const [archiving, archiveAction] = useActionState(
    async () => archivePost(postId),
    undefined
  );

  const [deleting, deleteAction] = useActionState(
    async () => deletePost(postId),
    undefined
  );

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 rounded hover:bg-slate-200 transition"
      >
        <IoEllipsisVertical className="w-5 h-5 text-slate-600" />
      </button>

      {open && (
        <div
          className={`
            absolute z-30 w-40 rounded-lg border bg-white shadow-lg
            ${isRTL ? "left-0" : "right-0"}
          `}
        >
          <ul className="py-1 text-sm text-slate-700 space-y-1">
            {/* Edit always available */}
            <li>
              <Link
                href={`/blog/myposts/edit/${postId}`}
                className="block px-3 py-2 hover:bg-slate-100"
              >
                {isRTL ? "ویرایش" : "Edit"}
              </Link>
            </li>

            {/* Preview always available */}
            <li>
              <Link
                href={`/blog/${slug}`}
                className="block px-3 py-2 hover:bg-slate-100"
              >
                {isRTL ? "پیش‌نمایش" : "Preview"}
              </Link>
            </li>

            {/* Status-based actions */}
            {status === "draft" && (
              <li>
                <form action={publishAction}>
                  <button
                    type="submit"
                    disabled={publishing}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100"
                  >
                    {isRTL ? "منتشر کردن" : "Publish"}
                  </button>
                </form>
              </li>
            )}

            {status === "published" && (
              <li>
                <form action={archiveAction}>
                  <button
                    type="submit"
                    disabled={archiving}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100"
                  >
                    {isRTL ? "بایگانی" : "Archive"}
                  </button>
                </form>
              </li>
            )}

            {status === "archived" && (
              <li>
                <form action={deleteAction}>
                  <button
                    type="submit"
                    disabled={deleting}
                    className="w-full text-left text-red-600 px-3 py-2 hover:bg-red-50"
                  >
                    {isRTL ? "حذف کامل" : "Delete Permanently"}
                  </button>
                </form>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
