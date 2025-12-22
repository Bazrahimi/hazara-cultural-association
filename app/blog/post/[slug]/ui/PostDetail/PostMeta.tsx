import { BlogRoutes } from "@/app/lib/routes";
import { PostTrans } from "@/app/lib/translation";
import Link from "next/link";

type Props = {
  authorName: string;
  userId: number;
  publishedAt: string;
  isRTL: boolean;
};

const PostMeta = ({
  authorName,
  userId,
  publishedAt,
  isRTL,
}: Props) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      {/* Author */}

      <Link
        href={BlogRoutes.authorByNamePlusId(userId)}
        className="flex items-center gap-1 underline-offset-2 hover:underline"
      >
        {isRTL && <span className="font-semibold">{authorName}</span>}
        <span>{isRTL ? PostTrans.author.rtl : PostTrans.author.en}</span>
        {!isRTL && <span className="font-semibold">{authorName}</span>}
      </Link>

      {/* Separator */}
      <span className="text-gray-300">•</span>

      {/* Published date */}

      <span className="flex items-center gap-1">
        <span>
          {isRTL ? PostTrans.publishedAt.rtl : PostTrans.publishedAt.en}
        </span>
        <span dir="ltr" className="inline-block text-gray-500">
          {publishedAt}
        </span>
      </span>
    </div>
  );
};

export default PostMeta;
