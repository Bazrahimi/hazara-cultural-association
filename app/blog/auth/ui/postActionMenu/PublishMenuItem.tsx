import { ActionMenuItemProps } from "./PostActionsMenu";
export default function PublishMenuItem({
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
          className={`w-full px-3 py-2 hover:bg-slate-100 disabled:opacity-60 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {isRTL ? "منتشر کردن" : "Publish"}
        </button>
      </form>
    </li>
  );
}
