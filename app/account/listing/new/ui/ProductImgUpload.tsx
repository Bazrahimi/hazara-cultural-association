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
        <h2 className="text-xl font-semibold text-gray-900">Images</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please upload <strong>two separate images</strong>: a square{" "}
          <em>Main Image</em> and a wide <em>Hero image</em>.
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
              Business Main Image
            </h3>
            <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              1 of 2
            </span>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Square (1:1)</span>, PNG preferred.
            Minimum <span className="font-medium">400×400</span>. Allowed: JPG,
            PNG, WEBP, HEIC.
          </p>

          <div className="mt-3">
            <CldFileUpload
              title="Upload Main Image"
              uploadPreset="hca-shop-images"
              value={mainImg}
              onChange={setMainImg}
            />
            {mainImgErr && (
              <p className="mt-2 text-sm text-red-600">{mainImgErr}</p>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div
          className={`rounded-2xl border bg-white p-4 shadow-sm ${
            heroErr ? "border-red-400" : "border-gray-200"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Hero Image
            </h3>
            <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              2 of 2
            </span>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Wide banner (16:9)</span>, shown at
            the top of your page. Minimum{" "}
            <span className="font-medium">1200×675</span>. Allowed: JPG, PNG,
            WEBP, HEIC.
          </p>

          <div className="mt-3">
            <CldFileUpload
              title="Upload Hero Image"
              uploadPreset="hca-shop-images"
              value={otherImgs}
              onChange={setOtherImgs}
            />
            {heroErr && <p className="mt-2 text-sm text-red-600">{heroErr}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
