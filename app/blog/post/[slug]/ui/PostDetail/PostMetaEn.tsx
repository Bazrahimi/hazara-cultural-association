import { getCategoryLabel } from "@/app/blog/lib/category";
import { BlogRoutes } from "@/app/lib/routes";
import { UserRoutes } from "@/app/lib/routes/UserRoutes";
import { PostCommonTrans } from "@/app/lib/translation";
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
};

const PostMetaEn = ({
  authorName,
  userId,
  createdAt,
  categoryId,
}: PostMetaProps) => {
  return (
    <div
      dir="ltr"
      className="
        mb-6 w-full border-b border-gray-100
        pb-4 text-sm text-gray-600
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
          <div className="flex flex-col items-start leading-tight">
            <P className="m-0 font-semibold text-gray-900 transition group-hover:text-gray-700">
              {authorName}
            </P>

            <P className="text-xs text-gray-500">
              {PostCommonTrans.labels.publishedOn.en} {createdAt}
            </P>
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
          {getCategoryLabel(categoryId, false)}
        </Button>
      </div>
    </div>
  );
};

export default PostMetaEn;
