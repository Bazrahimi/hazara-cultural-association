// app/blog/[slug]/layout.tsx
import { ORG_PROFILE } from "@/app/_lib/org/profile";
import type { ReactNode } from "react";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? `https://${ORG_PROFILE.domain}`;

// Fallback image if a post has no hero_img_path
const DEFAULT_OG_IMAGE_PATH = "/images/og_image.png";

type BlogPostLayoutProps = {
  children: ReactNode;

  params: Promise<{ slug: string }>;
};

// Simple helper to generate a meta description from HTML
function makeMetaDescription(html: string, maxLength = 180): string {
  if (!html) return "";

  const text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - 1) + "…";
}

// // 👇 Note params is a Promise in the type as well
// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ slug: string }>;
//   searchParams: { categoryId: string; rtl: string };
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const slugInfo = extractTitleFromSlug(slug);
//   if (!slugInfo) return notFound();

//   const post = await getPostById(slugInfo?.postId);

//   // If somehow not found, fall back (in practice getBlogPostBySlug calls notFound)
//   if (!post) {
//     const fallbackTitle = "Hazara Cultural Association – Article";
//     const fallbackUrl = `${BASE_URL}/blog/${slug}`;
//     const fallbackImage = `${BASE_URL}${DEFAULT_OG_IMAGE_PATH}`;

//     return {
//       title: fallbackTitle,
//       description:
//         "Hazara Cultural Association – community, heritage, and advocacy for justice and social cohesion.",
//       alternates: {
//         canonical: fallbackUrl,
//       },
//       openGraph: {
//         title: fallbackTitle,
//         description:
//           "Hazara Cultural Association – community, heritage, and advocacy for justice and social cohesion.",
//         url: fallbackUrl,
//         type: "website",
//         images: [
//           {
//             url: fallbackImage,
//             width: 1200,
//             height: 630,
//             alt: fallbackTitle,
//           },
//         ],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: fallbackTitle,
//         description:
//           "Hazara Cultural Association – community, heritage, and advocacy for justice and social cohesion.",
//         images: [fallbackImage],
//       },
//     };
//   }

//   const title = `${post.title}——By: ${post.authorName}`;
//   const url = `${BASE_URL}/blog/${post.slug}`;
//   const description = makeMetaDescription(post.contentHtml);

//   // Prefer hero image, otherwise fallback
//   const ogImagePath = post.heroImgPath || DEFAULT_OG_IMAGE_PATH;
//   const ogImageUrl =
//     ogImagePath.startsWith("http") || ogImagePath.startsWith("//")
//       ? ogImagePath
//       : `${BASE_URL}${ogImagePath}`;

//   return {
//     title,
//     description,
//     alternates: {
//       canonical: url,
//     },
//     openGraph: {
//       title,
//       description,
//       url,
//       type: "article",
//       siteName: "Hazara Cultural Association",
//       images: [
//         {
//           url: ogImageUrl,
//           width: 1200,
//           height: 630,
//           alt: title,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [ogImageUrl],
//     },
//   };
// }

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  // You don’t need params here yet; just render children.
  return <>{children}</>;
}
