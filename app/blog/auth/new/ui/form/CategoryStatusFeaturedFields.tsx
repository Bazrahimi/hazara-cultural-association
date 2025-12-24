import { POST_STATUS } from "@/app/blog/post/lib/definitions";

import type { CategoryId } from "@/app/blog/lib/category";
import { CATEGORY_MAP } from "@/app/blog/lib/category";
import { CreateEditPostTrans } from "@/app/lib/translation";
import type { PostInput, PostState } from "../../../../post/lib/schema";
import { ActionMode } from "../PostForm";
import AdvocacyEvent from "./AdvocacyEvent";
import { POST_FIELDS } from "@/app/blog/post/lib/helper";

type Props = {
  isRTL: boolean;
  categoryId: CategoryId;
  setCategoryId: (id: CategoryId) => void;
  state: PostState | undefined;
  initialData?: Partial<PostInput> & { id?: number };
  mode: ActionMode;
};
const CategoryStatusFeaturedFields = ({
  isRTL,
  categoryId,
  setCategoryId,
  state,
  initialData,
  mode,
}: Props) => {
  // Determine status: state → initialData → default "published"
  const statusValue =
    state?.data?.statusCode ?? initialData?.statusCode ?? POST_STATUS.PUBLISHED;

  const eventDateValue =
    (state?.data?.eventDate as string | undefined) ??
    (initialData?.eventDate as string | undefined) ??
    "";

  const eventLocationValue =
    state?.data?.eventLocation ?? initialData?.eventLocation ?? "";

  const t = CreateEditPostTrans.CategoryStatusFeaturedFields;
  const lang = isRTL ? "rtl" : "en";
  const f = POST_FIELDS;

  return (
    <>
      {/* Category + Status + Featured */}
      <div
        className={`grid items-end gap-4 md:grid-cols-3 ${
          isRTL ? "text-right" : ""
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            {isRTL ? t.categoryLabel[lang] : t.categoryLabel[lang]}
          </label>
          <select
            name={f.categoryId}
            value={categoryId}
            onChange={(e) =>
              setCategoryId(Number(e.target.value) as CategoryId)
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {(Object.keys(CATEGORY_MAP) as unknown as CategoryId[]).map(
              (id) => (
                <option key={id} value={id}>
                  {isRTL ? CATEGORY_MAP[id].rtl : CATEGORY_MAP[id].en}
                </option>
              )
            )}
          </select>
          {state?.errors?.categoryId && (
            <p className="text-xs text-red-600">{state.errors.categoryId[0]}</p>
          )}
        </div>

        {/* Status */}
        {/* Status */}
        <div>
          <span className="block text-sm font-medium text-gray-700">
            {isRTL ? t.statusLabel[lang] : t.statusLabel[lang]}
          </span>

          <div className="mt-1 flex flex-wrap gap-4 text-sm">
            {/* Draft */}
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name={f.statusCode}
                value={POST_STATUS.DRAFTED}
                defaultChecked={statusValue === POST_STATUS.DRAFTED}
                className="h-4 w-4"
              />
              {isRTL ? t.status.draft[lang] : t.status.draft[lang]}
            </label>

            {/* Published */}
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name={f.statusCode}
                value={POST_STATUS.PUBLISHED}
                defaultChecked={statusValue === POST_STATUS.PUBLISHED}
                className="h-4 w-4"
              />
              {isRTL ? t.status.published[lang] : t.status.published[lang]}
            </label>

            {/* Archived — ONLY for edit mode */}
            {mode === "edit" && (
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name={f.statusCode}
                  value={POST_STATUS.ARCHIVED}
                  defaultChecked={statusValue === POST_STATUS.ARCHIVED}
                  className="h-4 w-4"
                />
                {isRTL ? t.status.archived[lang] : t.status.archived[lang]}
              </label>
            )}
          </div>

          {state?.errors?.statusCode && (
            <p className="text-xs text-red-600">{state.errors.statusCode[0]}</p>
          )}
        </div>

        {/* Featured */}
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name={f.isFeatured}
              className="h-4 w-4"
              defaultChecked={
                state?.data?.isFeatured ?? initialData?.isFeatured ?? false
              }
            />
            {isRTL ? t.featuredLabel[lang] : t.featuredLabel[lang]}
          </label>
        </div>
      </div>

      {categoryId === 2 && (
        <AdvocacyEvent
          isRTL={isRTL}
          eventDate={eventDateValue}
          eventLocation={eventLocationValue}
        />
      )}
    </>
  );
};

export default CategoryStatusFeaturedFields;
