// ManagePostControls.tsx
"use client";

import { Button } from "@/app/ui/global/components";
import PostActionsMenu from "../../../auth/ui/postActionMenu/PostActionsMenu";

import { formatDateTimeAU } from "@/app/_lib/Date";
import { BlogRoutes } from "@/app/_lib/routes";
import { ManagePostTrans } from "@/app/_lib/translation";
import { P } from "@/app/ui/global/paragraph";
import { POST_STATUS, StatusCode } from "../../_lib/definitions";

const labels = ManagePostTrans.Label;
const headings = ManagePostTrans.heading;

export type PostActionMenuProps = {
  postId: number;
  slug: string;
  statusCode: StatusCode;
  isFeatured: boolean;
  isRTL: boolean;
  updatedAt: Date; // formatted e.g. "22 NOV 2025"
};

export function ManagePostControls({
  postId,
  slug,
  statusCode,
  isFeatured,
  isRTL = false,
  updatedAt,
}: PostActionMenuProps) {
  const heading = isRTL ? headings.rtl : headings.en;
  const note = isRTL ? ManagePostTrans.note.rtl : ManagePostTrans.note.en;

  const statusLabel = isRTL ? labels.Status.rtl : labels.Status.en;

  const statusText = isRTL
    ? ManagePostTrans.Status[statusCode].rtl
    : ManagePostTrans.Status[statusCode].en;

  // Colored chip per status
  const statusStyles = {
    [POST_STATUS.PUBLISHED]: "bg-green-100 text-green-700",
    [POST_STATUS.DRAFTED]: "bg-yellow-100 text-yellow-700",
    [POST_STATUS.ARCHIVED]: "bg-gray-200 text-gray-700",
  }[statusCode];

  const actionLabel = isRTL
    ? ManagePostTrans.actionedOn[statusCode].rtl
    : ManagePostTrans.actionedOn[statusCode].en;

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
          statusCode={statusCode}
          isFeatured={isFeatured}
          slug={slug}
        />
      </div>

      {/* Status & Last Updated Panel */}

      <div className="mb-3 flex flex-col gap-2 rounded-lg border bg-white px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Status */}
        <div className="flex items-center gap-2">
          <P className=" text-gray-500">{statusLabel}:</P>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles}`}
          >
            {statusText}
          </span>
        </div>

        {isFeatured && (
          <P className="rounded-full bg-blue-100 font-semibold text-hca-blue-light">
            {isRTL
              ? labels.FeaturedOnHomePage.rtl
              : labels.FeaturedOnHomePage.en}
          </P>
        )}

        <div className="flex items-center gap-4">
          <P className=" text-gray-500">{actionLabel}</P>
          <P className=" text-gray-700" dir="ltr">
            {formatDateTimeAU(updatedAt)}
          </P>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-10">
        <Button as="link" href={BlogRoutes.new()} size="xs" variant="outline">
          Add new Post
        </Button>
        <Button
          as="link"
          href={BlogRoutes.manageMyPosts()}
          variant="outline"
          size="xs"
        >
          Manage other Posts
        </Button>
      </div>

      {/* Author-only note */}
      <p className="mt-1 w-full text-[11px] text-gray-500 italic">{note}</p>
    </section>
  );
}
