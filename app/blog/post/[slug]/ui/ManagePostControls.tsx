// ManagePostControls.tsx
"use client";

import PostActionsMenu from "../../../auth/ui/postActionMenu/PostActionsMenu";

import { ManagePostTrans,  } from "@/app/lib/translation";
import { POST_STATUS, StatusCode } from "../../lib/definitions";

export type PostActionMenuProps = {
  postId: number;
  slug: string;
  statusCode: StatusCode;
  isFeatured: boolean;
  isRTL?: boolean;
  updatedAt: string; // formatted e.g. "22 NOV 2025"
};

export function ManagePostControls({
  postId,
  slug,
  statusCode,
  isFeatured,
  isRTL = false,
  updatedAt,
}: PostActionMenuProps) {
  const heading = isRTL
    ? ManagePostTrans.heading.rtl
    : ManagePostTrans.heading.en;
  const note = isRTL ? ManagePostTrans.note.rtl : ManagePostTrans.note.en;

  const statusLabel = isRTL
    ? ManagePostTrans.Label.Status.rtl
    : ManagePostTrans.Label.Status.en

  const updatedLabel = isRTL
  
    ? ManagePostTrans.Label.UpdatedOn.rtl
    : ManagePostTrans.Label.UpdatedOn.en;

  const statusText = isRTL
    ? ManagePostTrans.Status[statusCode].rtl
    : ManagePostTrans.Status[statusCode].en;

  // Colored chip per status
  const statusStyles = {
    [POST_STATUS.PUBLISHED]: "bg-green-100 text-green-700",
    [POST_STATUS.DRAFTED]: "bg-yellow-100 text-yellow-700",
    [POST_STATUS.ARCHIVED]: "bg-gray-200 text-gray-700",
  }[statusCode];

  return (
    <section
      className={`
        mt-10 rounded-xl border border-dashed border-gray-300 
        bg-gray-50 px-4 py-4 shadow-sm
        ${isRTL ? "text-right" : "text-left"}
      `}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top row: Heading + Actions menu */}
      <div
        className={`mb-4 flex items-center justify-between ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          {heading}
        </p>

        <PostActionsMenu
          isRTL={isRTL}
          postId={postId}
          slug={slug}
          statusCode={statusCode}
          isFeatured={isFeatured}
        />
      </div>

      {/* Status & Last Updated Panel */}
      <div
        className={`
          mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between 
          gap-2 border rounded-lg bg-white px-3 py-2
        `}
      >
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {statusLabel}:
          </span>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles}`}
          >
            {statusText}
          </span>
        </div>

        {/* Last updated */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {updatedLabel}:
          </span>
          <span className="text-xs font-semibold text-gray-700">
            {updatedAt}
          </span>
        </div>
      </div>

      {/* Author-only note */}
      <p className="mt-1 w-full text-[11px] text-gray-500 italic">{note}</p>
    </section>
  );
}
