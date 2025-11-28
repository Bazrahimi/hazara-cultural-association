
import { ActionMenuItemProps } from "./PostActionsMenu";

const  FeatureMenuItem = ({
  isRTL,
  postId,
  isPending,
  action,
  isFeatured,
}: ActionMenuItemProps) => {
  // Decide the button label based on feature status
  const label = isFeatured
    ? isRTL
      ? "حذف از صفحه اصلی" // Remove from homepage (RTL)
      : "Remove from Homepage"
    : isRTL
      ? "نشر در صفحه اصلی" // Publish to homepage (RTL)
      : "Publish to Homepage";

  return (
    <li>
      <form action={action}>
        <input type="hidden" name="postId" value={postId} />
        <button
          type="submit"
          disabled={isPending}
          className={`w-full px-3 py-2 hover:bg-slate-100 disabled:opacity-60 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {label}
        </button>
      </form>
    </li>
  );
};

export default FeatureMenuItem;
