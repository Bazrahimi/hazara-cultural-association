// app/blog/[slug]/ui/BlogPostDetail.tsx
import { Header } from "@/app/ui/global/Header";
import HeroImage from "./HeroImage";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import ContentSection from "./ContentSection";
import EventSection from "./EventSection";
import ManageControlGate from "./ManageControlGate";

import TricolorRule from "@/app/ui/global/TricolorRule";
import PostMetaEn from "./PostMeta";
const post = {
  postId: 12,
  userId: 15,
  title:
    "فیلم «پیکار»، ساخته داوود هلمندی برنده سه جایزه جشنواره فیلم مستند آمستردام شد",
  slug: "فیلم-پیکار-ساخته-داوود-هلمندی-برنده-سه-جایزه-جشنواره-فیلم-مستند-آمستردام-شد-12",
  contentHtml:
    "<p>داوود هلمندی، نویسنده فیلم و کارگردان افغانستان جایزه بهترین فیلم اول جشنواره بین‌المللی مستند آمستردام و دو جایزه دیگر این جشنواره را برای فیلم ۹۷ دقیقه‌ای خود، «پیکار»، دریافت کرد. این فیلم داستان چند نسل جابه‌جایی و تلاش آن‌ها برای یافتن تعلق، امنیت و آزادی را روایت می‌کند.</p><p>برندگان سی‌وهشتمین دوره جشنواره بین‌المللی فیلم مستند آمستردام «ایدفا» عصر پنجشنبه، ۲۹ عقرب در هالند جوایز خود را دریافت کردند. در این مراسم مستند «پیکار» ساخته داوود هلمندی نیز با کسب جوایزی، درخشید.</p><p>مستند پیکار داستان داوود هلمندی را روایت می‌کند که پس از سال‌ها دوری از وطن، به ایران و افغانستان بازمی‌گردد تا رابطه خود با پدرش را بازسازی کند. او و خانواده‌اش در نقاط مختلف جهان پراکنده‌اند و هر یک تجربه‌های متفاوتی از مهاجرت و دوری از خانه دارند.</p><p><br></p><p>این فیلم تلاش او برای نزدیک‌تر شدن به پدر سالخورده و سخت‌گیرش را نشان می‌دهد. پیکار تصویری عمیق از پیوند خانوادگی، مقاومت در برابر سختی‌ها و جستجوی آزادی و امنیت را ارائه می‌کند.</p><p>مستند «پیکار» که به زبان‌های فارسی و هالندی ساخته شده است جوایزی از جمله «ذکر ویژه بهترین فیلم هالندی» و «جایزه فیپرسکی» را نیز در این جشنواره دریافت کرده است.</p>",
  statusCode: 2,
  categoryId: 1,
  heroImgPath: "v1763940939/hca/blog_post/rapyajyxnwowtcvmcdcb.jpg",
  isFeatured: true,
  isRtl: true,
  eventDate: null,
  eventLocation: null,
  authorName: "Barat Batoor",
  updatedAt: "24 Nov 2025 10:35 am",
  createdAt: "24 Nov 2025 10:35 am",
};
type PostDetailProps = {
  postId: number;
  isRTL: boolean;
};

const PostBody = async ({ postId, isRTL }: PostDetailProps) => {
  // const post = await getPostById(postId);
  // console.log(post)

  if (!post) notFound();

  const isEvent = post.categoryId === 2;

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      {/* Title */}
      <div className="space-y-5">
        <Header
          as="h1"
          size="md"
          className="space-py-10"
          align={isRTL ? "right" : "left"}
        >
          {post.title}
        </Header>
      </div>

      {/* Meta wrapper */}
      <div className="rounded-2xl border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-2xl">
        <PostMetaEn
          authorName={post.authorName}
          userId={post.userId}
          createdAt={post.createdAt}
          categoryId={post.categoryId}
          isRTL={post.isRtl}
        />
      </div>

      <TricolorRule />

      {/* Advocacy event meta */}
      {isEvent && (
        <div className="mt-6">
          <EventSection
            eventDate={post.eventDate!}
            eventLocation={post.eventLocation!}
            isRTL={isRTL}
          />
        </div>
      )}
      <div className="mt-6">
        <ContentSection
          isRTL={post.isRtl}
          content={post.contentHtml}
          isLink={post.categoryId === 99}
        />
      </div>

      {/* Content */}
      <div>
        <Suspense fallback={null}>
          <HeroImage
            src={post.heroImgPath}
            alt={post.title}
            categoryId={post.categoryId}
          />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <ManageControlGate
          postId={post.postId}
          statusCode={post.statusCode}
          isFeatured={post.isFeatured}
          slug={post.slug}
          updatedAt={post.updatedAt}
          userId={post.userId}
        />
      </Suspense>
    </article>
  );
};

export default PostBody;
