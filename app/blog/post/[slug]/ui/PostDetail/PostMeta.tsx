import Link from "next/link";
import { MdPersonOutline } from "react-icons/md";

import { slugify } from "@/app/(disabled)/_shop/lib/helper";
import { formatDateTimeAU } from "@/app/_lib/Date";
import { cn } from "@/app/_lib/helper";
import { BlogRoutes } from "@/app/_lib/routes";
import { UserRoutes } from "@/app/_lib/routes/UserRoutes";
import { PublishedOn } from "@/app/_lib/translation/blog/post/transHelper";
import { getCategoryLabel } from "@/app/blog/post/lib/category";
import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";

export type PostMetaProps = {
  authorName: string;
  userId: number;
  updatedAt: string | Date | null;
  categoryId: number;
  isRTL: boolean;
};

const PostMeta = ({
  authorName,
  userId,
  updatedAt,
  categoryId,
  isRTL,
}: PostMetaProps) => {
  const dir = isRTL ? "rtl" : "ltr";
  const publishedLabel = isRTL ? PublishedOn.rtl : PublishedOn.en;
  const formattedDate = formatDateTimeAU(updatedAt);

  return (
    <div dir={dir} className="mb-6 w-full border-b border-gray-100 pb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Author block */}
        <Link
          href={UserRoutes.profile(`${slugify(authorName)}-${userId}`)}
          className="group flex items-center gap-3 transition hover:opacity-95"
        >
          {/* Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 transition group-hover:bg-gray-300">
            <MdPersonOutline
              className="h-10 w-10 text-gray-500 transition group-hover:text-gray-600"
              aria-hidden
            />
          </div>

          {/* Name + date */}
          <div
            className={cn(
              "flex flex-col leading-tight",
              isRTL ? "items-end text-right" : "items-start text-left",
            )}
          >
            <P className="m-0 font-semibold text-gray-900 transition group-hover:text-hca-blue-main">
              {authorName}
            </P>

            <div className="flex items-center gap-2">
              <P className="inline-flex text-gray-400" size="sm">
                {publishedLabel}
              </P>
              <P className="inline-flex text-gray-500" size="sm" dir="ltr">
                {formattedDate}
              </P>
            </div>
          </div>
        </Link>

        {/* Category */}
        <Button
          as="link"
          href={BlogRoutes.categoryById(categoryId)}
          size="xs"
          className="shrink-0 rounded-3xl"
          variant="outline"
        >
          {getCategoryLabel(categoryId, isRTL)}
        </Button>
      </div>
    </div>
  );
};

export default PostMeta;
