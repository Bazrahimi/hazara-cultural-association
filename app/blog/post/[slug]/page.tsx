import type { Breadcrumb } from "@/app/lib/definitions";
import { BlogRoutes } from "@/app/lib/routes";
import { BreadcrumbsTrans } from "@/app/lib/translation";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { getCategoryLabel } from "../../lib/category";
import { truncateTitle } from "../../lib/helper";

// app/blog/post/[slug]/page.tsx
const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: { categoryId: string; rtl: string };
}) => {
  const { slug } = await params;

  // If you use slugInfo
  // const slugInfo = extractPostFromSlug(slug);
  // if (!slugInfo) notFound();

  const categoryId = Number(searchParams.categoryId);

  const isRTL = searchParams?.rtl === "1";

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
      label: truncateTitle(slug, 30),
      href: "#",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} isRTL={isRTL} />
      {/* <BlogPostDetail slug={slug} /> */}
    </>
  );
};

export default page;
