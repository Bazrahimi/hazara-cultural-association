"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import type { PostStatus } from "../../../lib/definitions";
import ArchiveMenuItem from "./ArchiveMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";
import FeatureMenuItem from "./FeatureMenuItem";
import PublishMenuItem from "./PublishMenuItem";

import { setNotification } from "@/app/u/lib/setNotification";
import {
  archivePostAction,
  deletePostAction,
  featurePostAction,
  publishPostAction,
} from "../../lib/actions";

type Props = {
  isRTL: boolean;
  postId: number;
  slug: string;
  status: PostStatus;
  isFeatured?: boolean;
};

export default function PostActionsMenu({
  isRTL,
  postId,
  slug,
  status,
  isFeatured,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Server action states
  const [publishState, publishAction, publishing] = useActionState(
    publishPostAction,
    undefined
  );
  const [archiveState, archiveAction, archiving] = useActionState(
    archivePostAction,
    undefined
  );
  const [deleteState, deleteAction, deleting] = useActionState(
    deletePostAction,
    undefined
  );
  const [featureState, featureAction, featuring] = useActionState(
    featurePostAction,
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Publish
    if (publishState?.ok) {
      setNotification(publishState.message);
      setOpen(false);
      return;
    }

    // Archive
    if (archiveState?.ok) {
      setNotification(archiveState.message);
      setOpen(false);
      return;
    }

    // Delete
    if (deleteState?.ok) {
      setNotification(deleteState.message);
      setOpen(false);
    }

    // Feature / Unfeature
    if (featureState?.ok) {
      setNotification(featureState.message);
      setOpen(false);
      return;
    }
  }, [publishState, archiveState, deleteState, featureState]);

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
              <>
                <PublishMenuItem
                  isRTL={isRTL}
                  postId={postId}
                  isPending={publishing}
                  action={publishAction}
                />
                <DeleteMenuItem
                  isRTL={isRTL}
                  postId={postId}
                  isPending={deleting}
                  action={deleteAction}
                />
              </>
            )}

            {status === "published" && (
              <>
                <FeatureMenuItem
                  isRTL={isRTL}
                  postId={postId}
                  isPending={featuring}
                  action={featureAction}
                  isFeatured={isFeatured}
                />
                <ArchiveMenuItem
                  isRTL={isRTL}
                  postId={postId}
                  isPending={archiving}
                  action={archiveAction}
                />
              </>
            )}

            {status === "archived" && (
              <>
                <PublishMenuItem
                  isRTL={isRTL}
                  postId={postId}
                  isPending={publishing}
                  action={publishAction}
                />
                <DeleteMenuItem
                  isRTL={isRTL}
                  postId={postId}
                  isPending={deleting}
                  action={deleteAction}
                />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export type ActionMenuItemProps = {
  isRTL: boolean;
  postId: number;
  isPending: boolean;
  action: (formData: FormData) => void;
  isFeatured?: boolean;
};
