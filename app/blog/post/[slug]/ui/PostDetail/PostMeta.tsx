import { getCategoryLabel } from "@/app/blog/lib/category";
import { cn } from "@/app/lib/helper";
import { BlogRoutes } from "@/app/lib/routes";
import { UserRoutes } from "@/app/lib/routes/UserRoutes";
import { PublishedOn } from "@/app/lib/translation/blog/post/transHelper";
import { slugify } from "@/app/shop/lib/helper";
import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import { MdPersonOutline } from "react-icons/md";

export type PostMetaProps = {
  authorName: string;
  userId: number;
  createdAt: string;
  categoryId: number;
  isRTL: boolean;
};

const PostMeta = ({
  authorName,
  userId,
  createdAt,
  categoryId,
  isRTL,
}: PostMetaProps) => {
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="
        mb-6 w-full border-b border-gray-100
        pb-4 
      "
    >
      <div className="flex items-center justify-between">
        {/* Left side: Author block */}
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
              isRTL ? "items-center" : "item-start"
            )}
          >
            <P className="m-0 font-semibold text-gray-900 transition-all group-hover:text-hca-blue-main group-hover:translate-x-0.5">
              {authorName}
            </P>

            {isRTL ? (
              <div className="flex items-center gap-2">
                <P className="inline-flex text-gray-400 " size="sm">
                  {PublishedOn.rtl}
                </P>
                <P className="inline-flex text-gray-500" dir="ltr" size="sm">
                  {createdAt}
                </P>
              </div>
            ) : (
              <div className="flex gap-2">
                <P className="inline-flex text-gray-400" size="sm">
                  {PublishedOn.en}
                </P>
                <P className="inline-flex text-gray-500" size="sm">
                  {createdAt}
                </P>
              </div>
            )}
          </div>
        </Link>

        {/* Right side: Category */}
        <Button
          as="link"
          href={BlogRoutes.categoryById(categoryId)}
          size="xs"
          className="rounded-3xl"
          variant="outline"
        >
          {getCategoryLabel(categoryId, isRTL)}
        </Button>
      </div>
    </div>
  );
};

export default PostMeta;
