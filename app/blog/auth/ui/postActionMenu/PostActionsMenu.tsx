"use client";

import type { StatusCode } from "@/app/blog/post/lib/definitions";
import { POST_STATUS } from "@/app/blog/post/lib/definitions";
import { ManagePostTrans } from "@/app/lib/translation/";
import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { useActionState, useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import MenuItem from "./MenuItem";

const t = ManagePostTrans.action;

import { PostAction } from "@/app/blog/post/lib/action";
import { PostActionIntent } from "@/app/blog/post/lib/actionHelper";
import { CategoryId } from "@/app/blog/post/lib/category";
import { cn } from "@/app/lib/helper";
import { BlogRoutes } from "@/app/lib/routes";
import { setNotification } from "@/app/u/auth/_lib/setNotification";

type Props = {
  isRTL: boolean;
  postId: number;
  statusCode: StatusCode;
  isFeatured?: boolean;
  categoryId?: CategoryId;
  slug: string;
};

export default function PostActionsMenu({
  isRTL,
  postId,
  statusCode,
  isFeatured,
  categoryId,
  slug,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [state, formAction, isPending] = useActionState(PostAction, undefined);
  const [pendingIntent, setPendingIntent] = useState<PostActionIntent | null>(
    null,
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
    if (!state) return;

    if (state.ok) {
      setNotification(state.message);
      setOpen(false);
    } else if (state.message) {
      setNotification(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (!isPending) setPendingIntent(null);
  }, [isPending]);

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
      <Button
        size="xs"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Post Actions"
        className="inline-flex items-center gap-1 whitespace-nowrap"
      >
        <P> {isRTL ? t.button.rtl : t.button.en}</P>
        <IoEllipsisVertical className="w-5 h-5 text-slate-600 inline-flex" />
      </Button>

      {open && (
        <div
          className={cn(
            "absolute z-30 w-50 rounded-lg border bg-hca-blue-main shadow-lg",
            isRTL ? "left-0" : "right-0",
          )}
        >
          <ul className="py-1 text-sm text-gray-100 space-y-1">
            {/* Edit always available */}

            <MenuItem
              type="link"
              isRTL={isRTL}
              href={BlogRoutes.edit(postId)}
              label={isRTL ? t.Edit.rtl : t.Edit.en}
              onSelect={() => setOpen(false)}
            />
            {statusCode === POST_STATUS.PUBLISHED && (
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
                  action={formAction}
                  isPending={isPending && pendingIntent === "publish"}
                  isRTL={isRTL}
                  intent="publish"
                  onSelect={() => setPendingIntent("publish")}
                />
                <MenuItem
                  type="action"
                  label={labels.delete}
                  postId={postId}
                  action={formAction}
                  isPending={isPending && pendingIntent === "delete"}
                  isRTL={isRTL}
                  intent="delete"
                  onSelect={() => setPendingIntent("delete")}
                />
              </>
            )}

            {statusCode === POST_STATUS.PUBLISHED && (
              <>
                <MenuItem
                  type="action"
                  label={labels.feature}
                  postId={postId}
                  action={formAction}
                  isPending={isPending && pendingIntent === "feature"}
                  isRTL={isRTL}
                  intent="feature"
                  onSelect={() => setPendingIntent("feature")}
                />
                <MenuItem
                  type="action"
                  label={labels.archive}
                  postId={postId}
                  action={formAction}
                  isPending={isPending && pendingIntent === "archive"}
                  isRTL={isRTL}
                  intent="archive"
                  onSelect={() => setPendingIntent("archive")}
                />
              </>
            )}

            {statusCode === POST_STATUS.ARCHIVED && (
              <>
                <MenuItem
                  type="action"
                  label={labels.publish}
                  postId={postId}
                  action={formAction}
                  isPending={isPending && pendingIntent === "publish"}
                  isRTL={isRTL}
                  intent="publish"
                  onSelect={() => setPendingIntent("publish")}
                />
                <MenuItem
                  type="action"
                  label={labels.delete}
                  postId={postId}
                  action={formAction}
                  isPending={isPending && pendingIntent === "delete"}
                  isRTL={isRTL}
                  intent="delete"
                  onSelect={() => setPendingIntent("delete")}
                />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
