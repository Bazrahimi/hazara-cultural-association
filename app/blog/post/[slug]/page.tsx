import type { Breadcrumb } from "@/app/lib/definitions";
import { BlogRoutes } from "@/app/lib/routes";
import { BreadcrumbsTrans } from "@/app/lib/translation";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { notFound } from "next/navigation";
import { getCategoryLabel } from "../../lib/category";
import { extractPostFromSlug, truncateTitle } from "../../lib/helper";
import PostDetailBody from "./ui/PostDetail/PostBody";

// app/blog/post/[slug]/page.tsx
const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ catId: string; rtl: string }>;
}) => {
  const { slug } = await params;

  const { catId, rtl } = await searchParams;
  const categoryId = Number(catId);

  const isRTL = rtl === "1";

  const slugInfo = extractPostFromSlug(slug);
  if (!slugInfo) return notFound();

  const breadcrumbs: Breadcrumb[] = [
    {
      label: isRTL ? BreadcrumbsTrans.home.rtl : BreadcrumbsTrans.home.en,
      href: BlogRoutes.root(),
    },
    {
      label: isRTL
        ? BreadcrumbsTrans.articleAndPost.rtl
        : BreadcrumbsTrans.articleAndPost.en,
      href: BlogRoutes.root(),
    },
    {
      label: getCategoryLabel(categoryId, isRTL),
      href: BlogRoutes.categoryById(categoryId),
    },
    {
      label: truncateTitle(slugInfo?.title, 40),
      href: "#",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} isRTL={isRTL} />
      <PostDetailBody postId={Number(slugInfo.postId)} isRTL={isRTL} />
    </>
  );
};

export default page;
