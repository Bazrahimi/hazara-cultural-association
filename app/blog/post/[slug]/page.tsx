import type { Breadcrumb } from "@/app/lib/definitions";
import { BlogRoutes } from "@/app/lib/routes";
import { BreadcrumbsTrans } from "@/app/lib/translation/BreadcrumbsTrans";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Suspense } from "react";
import { extractTitleFromSlug } from "../../lib/helper";
import { getCategoryLabel } from "../lib/category";
import PostBody from "./ui/PostDetail/PostBody";
import PostShell from "./ui/PostDetail/PostShell";

// app/blog/post/[slug]/page.tsx
const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ catId: string; rtl: string; id: string }>;
}) => {
  const { slug } = await params;

  const { catId, rtl, id } = await searchParams;
  const categoryId = Number(catId);

  const isRTL = rtl === "1";

  const title = extractTitleFromSlug(slug);

  const categoryLabel = getCategoryLabel(categoryId, isRTL);
  const breadcrumbs: Breadcrumb[] = [
    {
      label: isRTL ? BreadcrumbsTrans.home.rtl : BreadcrumbsTrans.home.en,
      href: "/",
    },
    {
      label: isRTL
        ? BreadcrumbsTrans.articleAndPost.rtl
        : BreadcrumbsTrans.articleAndPost.en,
      href: BlogRoutes.root(),
    },
    {
      label: categoryLabel,
      href: BlogRoutes.categoryById(categoryId),
    },
    {
      label: title,
      href: "#",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} isRTL={isRTL} />
      <Suspense
        fallback={
          <PostShell
            isRTL={isRTL}
            categoryId={categoryId}
            title={title}
            categoryLabel={categoryLabel}
          />
        }
      >
        <PostBody postId={Number(id)} isRTL={isRTL} />
      </Suspense>
    </>
  );
};

export default page;
