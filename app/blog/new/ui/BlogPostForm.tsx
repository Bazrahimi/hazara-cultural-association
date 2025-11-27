// app/blog/new/ui/BlogPostForm.tsx

"use client";

import { setNotification } from "@/app/u/lib/setNotification";
import CldFileUpload from "@/app/ui/global/CLdFileUpload";
import { Input } from "@/app/ui/global/components";
import { useActionState, useEffect, useState } from "react";
import { type CategoryId } from "../../lib/helper";
import type { BlogPostInput, BlogPostState } from "../lib/definitions";
import { ActionMode } from "../lib/definitions";
import AdvocacyEvent from "./form/AdvocacyEvent";
import CategoryStatusFeaturedFields from "./form/CategoryStatusFeaturedFields";
import EditorField from "./form/EditorField";
import FormFooter from "./form/FormFooter";
import FormHeader from "./form/FormHeader";
import { SuccessModal } from "./form/SuccessModal";

type Props = {
  mode: ActionMode;
  action: (
    prev: BlogPostState | undefined,
    formData: FormData
  ) => Promise<BlogPostState>;
  initialData?: Partial<BlogPostInput> & { id?: number };
};

// Helper: coerce unknown value to boolean
function toBoolean(raw: unknown): boolean {
  return (
    raw === true || raw === "true" || raw === 1 || raw === "1" || raw === "on" // just in case, from native inputs
  );
}

export default function BlogPostForm({ mode, action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState<
    BlogPostState | undefined,
    FormData
  >(action, undefined);

  // RTL toggle for Farsi / Hazaragi
  const [isRTL, setIsRTL] = useState<boolean>(() => {
    if (initialData?.isRtl === undefined) return false; // default false
    return toBoolean(initialData.isRtl);
  });

  // Controlled fields
  const [contentHTML, setContentHTML] = useState(
    initialData?.contentHtml ?? ""
  );
  const [heroImage, setHeroImage] = useState(initialData?.heroImgPath ?? "");

  // 🔹 Derive category from state or initialData (fallback 1 = news)
  const derivedCategoryId: CategoryId = Number(
    state?.data?.categoryId ?? initialData?.categoryId ?? 1
  ) as CategoryId;

  // Local state so the select is controlled immediately on change
  const [categoryId, setCategoryId] = useState<CategoryId>(derivedCategoryId);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Keep local categoryId in sync when server/initial data changes
  useEffect(() => {
    setCategoryId(derivedCategoryId);
  }, [derivedCategoryId]);

  useEffect(() => {
    if (state?.ok) {
      if (state.message) {
        setNotification(state?.message);
      }

      setShowSuccessModal(true);
    }
  }, [state]);

  // Sync from validation state for other controlled fields
  useEffect(() => {
    if (state?.data?.contentHtml !== undefined) {
      setContentHTML(state.data.contentHtml ?? "");
    }

    if (state?.data?.heroImgPath !== undefined) {
      setHeroImage(state.data.heroImgPath ?? "");
    }

    if (state?.data?.isRtl !== undefined) {
      setIsRTL(toBoolean(state.data.isRtl));
    }
  }, [state]);

  const eventDateValue =
    (state?.data?.eventDate as string | undefined) ??
    (initialData?.eventDate as string | undefined) ??
    "";

  const eventLocationValue =
    state?.data?.eventLocation ?? initialData?.eventLocation ?? "";

  // Compute the message shown above the footer button
  const footerMessage =
    state?.ok === false && state?.message ? state.message : ""; // empty string means "no message"

  // Strip Quill's internal UI spans (like <span class="ql-ui">...</span>)
  function cleanQuillHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<span class="ql-ui"[^>]*><\/span>/g, "");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <FormHeader mode={mode} isRTL={isRTL} setIsRTL={setIsRTL} />

      <form action={formAction} className="space-y-6" noValidate>
        {mode === "edit" && initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}

        {/* is_rtl is always sent as "true"/"false" */}
        <input type="hidden" name="isRtl" value={isRTL ? "true" : "false"} />

        {/* Title */}
        <Input
          id="title"
          label={isRTL ? "عنوان مطلب" : "Title"}
          placeholder={
            isRTL
              ? "یک عنوان کوتاه برای مطلب خو نوشته کید"
              : "Enter a brief title for the post"
          }
          type="text"
          defaultValue={state?.data?.title ?? initialData?.title ?? ""}
          error={state?.errors?.title}
          required
          isRTL={isRTL}
        />

        {/* ✅ Extracted component */}
        <CategoryStatusFeaturedFields
          isRTL={isRTL}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          state={state}
          initialData={initialData}
          mode={mode}
        />

        {/* Event fields */}

        <AdvocacyEvent
          isRTL={isRTL}
          eventDate={eventDateValue}
          eventLocation={eventLocationValue}
          categoryId={categoryId}
        />

        {/* Content */}
        <EditorField
          isRTL={isRTL}
          value={contentHTML}
          onChange={setContentHTML}
          error={state?.errors?.contentHtml}
        />

        {/* Send cleaned HTML to the server */}
        <input
          type="hidden"
          name="contentHtml"
          value={cleanQuillHtml(contentHTML)}
        />

        {/* Hero image */}
        <CldFileUpload
          title={isRTL ? "آپلود تصویر" : "Upload Image"}
          uploadPreset="hca-blog-post-hero"
          onChange={setHeroImage}
          value={heroImage}
        />
        <input type="hidden" name="heroImgPath" value={heroImage} />

        {/* Submit button */}
        <FormFooter
          mode={mode}
          isRTL={isRTL}
          isLoading={isPending}
          footerMessage={footerMessage}
        />
      </form>
      {showSuccessModal && state?.ok && state.success && (
        <SuccessModal
          message={state.message ?? ""}
          postTitle={state.postTitle ?? state.data?.title ?? ""}
          success={state.success}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
