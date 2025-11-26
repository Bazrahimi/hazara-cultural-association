import Link from "next/link";
import { PostStatus } from "@/app/blog/lib/definitions";

type SuccessModalProps = {
  message: string;
  slug: string;
  status?: PostStatus;
  onClose: () => void;
};

export function SuccessModal({ message, slug, status, onClose }: SuccessModalProps) {
  const isPublished = status === "published";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-semibold">
          {isPublished ? "Post published" : "Post saved"}
        </h2>

        <p className="text-sm text-slate-700">{message}</p>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          {isPublished && (
            <Link
              href={`/blog/${slug}`}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500"
            >
              Preview post
            </Link>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            {isPublished ? "Create another post" : "Back to editing"}
          </button>
        </div>
      </div>
    </div>
  );
}
