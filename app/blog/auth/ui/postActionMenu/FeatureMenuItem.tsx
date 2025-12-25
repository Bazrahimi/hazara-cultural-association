
import { ActionMenuItemProps } from "./PostActionsMenu";
import { ManagePostTrans } from "@/app/lib/translation";
const t = ManagePostTrans.action

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
      ? t.RemoveFromHomepage.rtl
      : t.RemoveFromHomepage.en
    : isRTL
      ? t.FeatureToHomepage.rtl
      : t.FeatureToHomepage.en;

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
