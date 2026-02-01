import { Header, P } from "@/app/_ui";

type PostHeaderProps = {
  title: string;
  rtlTitle: string;
  description: string;
  rtlDescription: string;
  // optional: customize colours
  descriptionClass?: string;
  rtlDescriptionClass?: string;
};

export default function PostHeader({
  title,
  rtlTitle,
  description,
  rtlDescription,
  descriptionClass = "text-slate-500",
  rtlDescriptionClass = "text-slate-500",
}: PostHeaderProps) {
  return (
    <div className="mb-3">
      {/* Headings Row */}
      <div className="flex justify-between">
        <Header as="h2" size="sm">
          {title}
        </Header>

        <Header as="h2" size="sm" dir="rtl">
          {rtlTitle}
        </Header>
      </div>

      {/* English description */}
      <P className={descriptionClass}>{description}</P>

      {/* RTL description */}
      <P className={rtlDescriptionClass} dir="rtl">
        {rtlDescription}
      </P>
    </div>
  );
}
