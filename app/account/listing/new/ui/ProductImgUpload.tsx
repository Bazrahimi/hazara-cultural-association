// ProductImgUpload.tsx
import CldFileUpload from "@/app/ui/global/CLdFileUpload";

type FieldErrors = Partial<Record<"mainImg" | "otherImgs", string[]>>;

type Props = {
  mainImg: string;
  otherImgs: string;
  setMainImg: (url: string) => void;
  setOtherImgs: (url: string) => void;
  errors?: FieldErrors;
};

export default function ProductImgUpload({
  mainImg,
  otherImgs,
  setMainImg,
  setOtherImgs,
  errors,
}: Props) {
  const mainImgErr = errors?.mainImg?.[0];
  const heroErr = errors?.otherImgs?.[0];

  return (
    <section className="p-2 sm:p-4">
      <header className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Product images</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please upload <strong>one main image</strong> for the product
          thumbnail. You can also add <strong>one additional image</strong> that
          appears on the product page to show more detail.
        </p>
      </header>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Main Image */}
        <div
          className={`rounded-2xl border bg-white p-4 shadow-sm ${
            mainImgErr ? "border-red-400" : "border-gray-200"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Main product image (thumbnail)
            </h3>
            <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              Required
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Use a <span className="font-medium">square</span> image (1:1).
            Minimum <span className="font-medium">400×400</span>. Transparent
            PNG preferred, but JPG/PNG/WEBP/HEIC are accepted. Keep it clear,
            well-lit, and without text overlays.
          </p>

          <div className="mt-3">
            <CldFileUpload
              title="Upload main image"
              uploadPreset="hca-shop-images"
              value={mainImg}
              onChange={setMainImg}
            />
            {mainImgErr && (
              <p className="mt-2 text-sm text-red-600">{mainImgErr}</p>
            )}
          </div>
        </div>

        {/* Additional / Hero Image */}
        <div
          className={`rounded-2xl border bg-white p-4 shadow-sm ${
            heroErr ? "border-red-400" : "border-gray-200"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Additional image (shown on product page)
            </h3>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              Optional
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Recommended <span className="font-medium">wide</span> image (16:9)
            for a banner look. Minimum{" "}
            <span className="font-medium">1200×675</span>. JPG/PNG/WEBP/HEIC
            accepted. Use this to show close-ups, texture, or how the item is
            used/worn.
          </p>

          <div className="mt-3">
            <CldFileUpload
              title="Upload additional image"
              uploadPreset="hca-shop-images"
              value={otherImgs}
              onChange={setOtherImgs}
            />
            {heroErr && <p className="mt-2 text-sm text-red-600">{heroErr}</p>}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Tip: Cultural items photograph best on a simple background with natural
        light. Include any unique patterns, stitching, or craftsmanship that
        reflects Hazara heritage.
      </div>
    </section>
  );
}
