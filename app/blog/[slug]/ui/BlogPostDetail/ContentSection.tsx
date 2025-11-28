import { enhanceContentWithYoutubeEmbeds } from "./enhanceContent";

type Props = {
  content: string;
  isLink: boolean;
  isRTL: boolean;
};

const ContentSection = ({ content, isRTL, isLink }: Props) => {
  // only enhance when category_id === 99

  const finalHTML = isLink ? enhanceContentWithYoutubeEmbeds(content) : content;

  return (
    <section
      className={`
        mt-6
        rounded-xl bg-white/90 px-4 py-5 shadow-sm ring-1 ring-gray-100
      `}
    >
      <div
        className={`
          prose prose-sm sm:prose-base max-w-none prose-img:rounded-lg
          prose-headings:font-semibold prose-headings:text-gray-900
          prose-p:text-gray-800 prose-p:leading-relaxed
          prose-li:marker:text-gray-400

          prose-ul:list-disc prose-ol:list-decimal
          prose-ul:pl-5 prose-ol:pl-5

          prose-a:text-blue-700
          prose-a:font-semibold
          prose-a:no-underline
          hover:prose-a:underline
          prose-a:underline-offset-2
          hover:prose-a:text-blue-800

          ${isRTL ? "text-right prose-headings:text-right" : "prose-headings:text-left"}
        `}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          className="prose-headings:scroll-mt-24"
          dangerouslySetInnerHTML={{ __html: finalHTML }}
        />
      </div>
    </section>
  );
};

export default ContentSection;
