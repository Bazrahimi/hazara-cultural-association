import { BlogRoutes } from "@/app/_lib/routes";
import { Button, Header } from "@/app/_ui";
import {
  POST_STATUS,
  type PostInsertUpdateSuccessDBReturn,
} from "@/app/blog/post/_lib/definitions";

type SuccessModalProps = {
  postTitle: string;
  success: PostInsertUpdateSuccessDBReturn;
  message?: string;
  onClose?: () => void;
};

export function SuccessModal({
  postTitle,
  message,
  success,
}: SuccessModalProps) {
  const statusValue = success.statusCode; // ✅ get status from success
  const isPublished = statusValue === POST_STATUS.PUBLISHED;
  const isArchived = statusValue === POST_STATUS.ARCHIVED;
  const isDraft = statusValue === POST_STATUS.DRAFTED;

  // ------- Dynamic Header -------
  const getTitle = () => {
    if (isPublished) return "Post Published";
    if (isArchived) return "Post Archived";
    if (isDraft) return "Draft Saved";
    return "Success";
  };

  // ------- Dynamic Body Message -------
  const getStatusMessage = () => {
    if (isPublished) {
      let msg = "Your post is now publicly available on the website.";

      if (success.isFeatured) {
        msg += " It is also featured on the homepage.";
      } else {
        msg +=
          " You can feature it on the homepage via the actions menu if you wish.";
      }

      return msg;
    }

    if (isDraft) {
      return "Your post is saved as a draft. It is not publicly visible yet. You can preview it or publish it anytime.";
    }

    if (isArchived) {
      return "Your post has been archived. It is no longer publicly visible.";
    }

    return message ?? "Your changes have been saved.";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header bar */}
        <div className="bg-blue-600 px-6 py-4">
          <Header as="h1" className="text-white">
            {getTitle()}
          </Header>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-5">
          {/* Post title */}
          <p className="text-base font-medium text-slate-900">{postTitle}</p>

          {/* Dynamic message */}
          <p className="text-sm text-slate-700">{getStatusMessage()}</p>

          {/* Row 1: Preview + Manage */}
          <div className="grid grid-cols-2 gap-3">
            {success.slug ? (
              <Button
                as="link"
                href={`${BlogRoutes.post(success.slug)}?catId=${success.categoryId}&rtl=${success.isRtl ? 1 : 0}&id=${success.postId}`}
                size="sm"
                variant="outline"
                fullWidth
              >
                Preview Post
              </Button>
            ) : (
              <div />
            )}

            <Button
              as="link"
              href={BlogRoutes.manageMyPosts()}
              size="sm"
              variant="outline"
              fullWidth
            >
              Manage Posts
            </Button>
          </div>

          {/* Full-width: Edit current post */}

          {/* Row 2: Create new + Homepage */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              as="link"
              href={`${BlogRoutes.edit(success.postId)}`}
              size="sm"
              variant="outline"
              fullWidth
            >
              Edit This Post
            </Button>
            <Button
              as="link"
              href={BlogRoutes.new()}
              size="sm"
              variant="outline"
              fullWidth
            >
              New Post
            </Button>
          </div>

          {/* Full-width Close */}
          <Button as="link" href="/" size="sm" variant="danger" fullWidth>
            Close and Return to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
}
