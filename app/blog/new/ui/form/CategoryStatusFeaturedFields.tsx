import { CATEGORY_MAP, type CategoryId } from "../../../lib/category";
import type {
  ActionMode,
  BlogPostInput,
  BlogPostState,
} from "../../lib/definitions";
import AdvocacyEvent from "./AdvocacyEvent";
type Props = {
  isRTL: boolean;
  categoryId: CategoryId;
  setCategoryId: (id: CategoryId) => void;
  state: BlogPostState | undefined;
  initialData?: Partial<BlogPostInput> & { id?: number };
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
  const statusValue = state?.data?.status ?? initialData?.status ?? "published";

  const eventDateValue =
    (state?.data?.eventDate as string | undefined) ??
    (initialData?.eventDate as string | undefined) ??
    "";

  const eventLocationValue =
    state?.data?.eventLocation ?? initialData?.eventLocation ?? "";

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
            {isRTL ? "دسته‌بندی" : "Category"}
          </label>
          <select
            name="categoryId"
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
            {isRTL ? "وضعیت" : "Status"}
          </span>

          <div className="mt-1 flex flex-wrap gap-4 text-sm">
            {/* Draft */}
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="draft"
                defaultChecked={statusValue === "draft"}
                className="h-4 w-4"
              />
              {isRTL ? "پیش‌نویس" : "Draft"}
            </label>

            {/* Published */}
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="published"
                defaultChecked={statusValue === "published"}
                className="h-4 w-4"
              />
              {isRTL ? "منتشر شده" : "Published"}
            </label>

            {/* Archived — ONLY for edit mode */}
            {mode === "edit" && (
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="archived"
                  defaultChecked={statusValue === "archived"}
                  className="h-4 w-4"
                />
                {isRTL ? "آرشیو شده" : "Archived"}
              </label>
            )}
          </div>

          {state?.errors?.status && (
            <p className="text-xs text-red-600">{state.errors.status[0]}</p>
          )}
        </div>

        {/* Featured */}
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="isFeatured"
              className="h-4 w-4"
              defaultChecked={
                state?.data?.isFeatured ?? initialData?.isFeatured ?? false
              }
            />
            {isRTL ? "نمایش در صفحه اصلی" : "Featured on homepage"}
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
