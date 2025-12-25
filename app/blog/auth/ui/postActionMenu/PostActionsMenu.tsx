"use client";

import type { StatusCode } from "@/app/blog/post/lib/definitions";
import { POST_STATUS } from "@/app/blog/post/lib/definitions";
import { ManagePostTrans } from "@/app/lib/translation/";
import { useActionState, useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import MenuItem from "./MenuItem";

const t = ManagePostTrans.action;

import { CategoryId } from "@/app/blog/lib/category";
import {
  archivePostAction,
  deletePostAction,
  featurePostAction,
  publishPostAction,
} from "@/app/blog/post/lib/action";
import { BlogRoutes } from "@/app/lib/routes";
import { setNotification } from "@/app/u/auth/lib/setNotification";

type Props = {
  isRTL: boolean;
  postId: number;
  slug: string;
  statusCode: StatusCode;
  isFeatured?: boolean;
  categoryId?: CategoryId;
};

export default function PostActionsMenu({
  isRTL,
  postId,
  slug,
  statusCode,
  isFeatured,
  categoryId,
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

  const labels = {
    publish: isRTL ? t.Publish.rtl : t.Publish.en,
    delete: isRTL ? t.Delete.rtl : t.Delete.en,
    archive: isRTL ? t.Archive.rtl : t.Archive.en,
    feature: isFeatured
      ? isRTL
        ? t.RemoveFromHomepage.rtl
        : t.RemoveFromHomepage.en
      : isRTL
        ? t.FeatureToHomepage.rtl
        : t.FeatureToHomepage.en,
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 rounded hover:bg-slate-200 transition"
      >
        <IoEllipsisVertical className="w-5 h-5 text-slate-600" />
      </button>

      {open && (
        <div className="absolute z-30 w-50 rounded-lg border bg-hca-blue-main shadow-lg right-0">
          <ul className="py-1 text-sm text-gray-100 space-y-1">
            {/* Edit always available */}

            <MenuItem
              type="link"
              isRTL={isRTL}
              href={BlogRoutes.edit(postId)}
              label={isRTL ? t.Edit.rtl : t.Edit.en}
              onSelect={() => setOpen(false)}
            />
            {categoryId && (
              <MenuItem
                type="link"
                isRTL={isRTL}
                href={`${BlogRoutes.post(slug)}?catId=${categoryId}&rtl=${isRTL ? 1 : 0}&id=${postId}`}
                label={isRTL ? t.Preview.rtl : t.Preview.en}
              />
            )}

            {/* Status-based actions */}
            {statusCode === POST_STATUS.DRAFTED && (
              <>
                <MenuItem
                  type="action"
                  label={labels.publish}
                  postId={postId}
                  action={publishAction}
                  isPending={publishing}
                  isRTL={isRTL}
                />
                <MenuItem
                  type="action"
                  label={labels.delete}
                  postId={postId}
                  action={deleteAction}
                  isPending={deleting}
                  isRTL={isRTL}
                />
              </>
            )}

            {statusCode === POST_STATUS.PUBLISHED && (
              <>
                <MenuItem
                  type="action"
                  label={labels.feature}
                  postId={postId}
                  action={featureAction}
                  isPending={featuring}
                  isRTL={isRTL}
                />
                <MenuItem
                  type="action"
                  label={labels.archive}
                  postId={postId}
                  action={archiveAction}
                  isPending={archiving}
                  isRTL={isRTL}
                />
              </>
            )}

            {statusCode === POST_STATUS.ARCHIVED && (
              <>
                <MenuItem
                  type="action"
                  label={labels.publish}
                  postId={postId}
                  action={publishAction}
                  isPending={publishing}
                  isRTL={isRTL}
                />
                <MenuItem
                  type="action"
                  label={labels.delete}
                  postId={postId}
                  action={deleteAction}
                  isPending={deleting}
                  isRTL={isRTL}
                />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
