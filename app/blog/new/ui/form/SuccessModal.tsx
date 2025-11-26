import type { PostStatus } from "@/app/blog/lib/definitions";
import Link from "next/link";

type SuccessModalProps = {
  message: string;
  slug?: string;
  status?: PostStatus;
  onClose: () => void;
};

export function SuccessModal({
  message,
  slug,
  status,
  onClose,
}: SuccessModalProps) {
  const isPublished = status === "published";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold">
          {isPublished ? "Post published" : "Success"}
        </h2>

        <p className="text-sm text-slate-700">{message}</p>

        <div className="flex flex-wrap justify-end gap-3 pt-3">
          {/* Preview only if we have a slug */}
          {slug && (
            <Link
              href={`/blog/${slug}`}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500"
            >
              Preview post
            </Link>
          )}

          <Link
            href="/blog/myposts"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Manage more posts
          </Link>

          <Link
            href="/blog/new"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Create new post
          </Link>

          <Link
            href="/"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Go to homepage
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
