import { ActionMenuItemProps } from "./PostActionsMenu";

export default function DeleteMenuItem({
  isRTL,
  postId,
  isPending,
  action,
}: ActionMenuItemProps) {
  return (
    <li>
      <form action={action}>
        <input type="hidden" name="postId" value={postId} />
        <button
          type="submit"
          disabled={isPending}
          className={`w-full px-3 py-2 hover:bg-slate-100 disabled:opacity-60 text-red-500 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {isRTL ? "حذف کامل" : "Delete Permanently"}
        </button>
      </form>
    </li>
  );
}
