import type { CategoryId } from "../../../lib/helper";
import { CATEGORY_MAP } from "../../../lib/helper";
import type {
  ActionMode,
  BlogPostInput,
  BlogPostState,
} from "../../lib/definitions";
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
  const isAdvocacyEvent = categoryId === 2;

  // Determine status: state → initialData → default "published"
  const statusValue = state?.data?.status ?? initialData?.status ?? "published";

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
            name="category_id"
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
          {state?.errors?.category_id && (
            <p className="text-xs text-red-600">
              {state.errors.category_id[0]}
            </p>
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
              name="is_featured"
              className="h-4 w-4"
              defaultChecked={
                state?.data?.is_featured ?? initialData?.is_featured ?? false
              }
            />
            {isRTL ? "نمایش در صفحه اصلی" : "Featured on homepage"}
          </label>
        </div>
      </div>

      {/* Event fields */}
      {isAdvocacyEvent && (
        <div className="grid gap-4 md:grid-cols-2" dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              {isRTL ? "تاریخ و زمان برنامه" : "Event date & time"}
            </label>
            <input
              type="datetime-local"
              name="event_date"
              defaultValue={
                (state?.data?.event_date as string | undefined) ??
                (initialData?.event_date as string | undefined) ??
                ""
              }
              className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
                isRTL ? "text-right" : ""
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              {isRTL ? "محل برگزاری" : "Event location"}
            </label>
            <input
              name="event_location"
              defaultValue={
                state?.data?.event_location ?? initialData?.event_location ?? ""
              }
              className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
                isRTL ? "text-right" : ""
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryStatusFeaturedFields;
