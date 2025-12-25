"use client";
import { ActionMenuItemProps } from "./PostActionsMenu";

type Props = ActionMenuItemProps & {
  label: string;
};
const ActionMenuItem = ({ label, postId, action, isPending, isRTL }: Props) => {
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
}
export default ActionMenuItem;
