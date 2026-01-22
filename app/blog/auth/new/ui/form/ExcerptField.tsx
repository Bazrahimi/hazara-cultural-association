"use client";

import { cn } from "@/app/lib/helper";
import { CreateEditPostTrans } from "@/app/lib/translation";
import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
const t = CreateEditPostTrans.Excerpt;

function extractTextExcerpt(html?: string, maxLength = 160): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd();
}

type Props = {
  isRTL: boolean;
  value: string;
  onChange: (v: string) => void;
  contentHtml?: string;
  error?: string[];
  maxLength?: number;
  required?: boolean;
};

const ExcerptField = ({
  isRTL,
  value,
  onChange,
  contentHtml,
  error,
  maxLength = 160,
  required = true,
}: Props) => {
  const hasError = !!error?.length;
  const remaining = Math.max(0, maxLength - value.length);
  const lang = isRTL ? "rtl" : "en";

  return (
    <div className="space-y-2" dir={isRTL ? "rtl" : "ltr"}>
      <label
        htmlFor="excerpt"
        className="block text-sm font-medium text-gray-700"
      >
        {t.label[lang]}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      <textarea
        id="excerpt"
        name="excerpt"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        rows={3}
        maxLength={maxLength}
        required={required}
        placeholder={t.placeholder[lang]}
        className={cn(
          "block w-full rounded-md border bg-white p-3 text-sm leading-relaxed",
          "focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-hca-blue-main",
          hasError ? "border-red-300" : "border-gray-200"
        )}
      />
      {contentHtml && contentHtml.length > 20 && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Button
            variant="outline"
            size="xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(extractTextExcerpt(contentHtml, maxLength));
            }}
            className="rounded-md px-2 py-1 hover:bg-gray-100"
          >
            {t.autoGenerate[lang]}
          </Button>

          <P>
            {remaining} {t.charactersLeft[lang]}
          </P>
        </div>
      )}

      {hasError && (
        <div className="text-xs text-red-600">
          {error!.map((msg, i) => (
            <p key={`excerpt-error-${i}`}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExcerptField;
