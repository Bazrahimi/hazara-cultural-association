"use client";

import clsx from "clsx";
import Link from "next/link";
import { ImSpinner10 } from "react-icons/im";

type CommonProps = {
  isRTL: boolean;
  label: string;
  className?: string;
  onSelect?: () => void; // close menu immediately if you want
};

type LinkItemProps = CommonProps & {
  type: "link";
  href: string;
};

type ActionItemProps = CommonProps & {
  type: "action";
  postId: number;
  action: (formData: FormData) => void;
  isPending: boolean;
};

export type MenuItemProps = LinkItemProps | ActionItemProps;

export default function MenuItem(props: MenuItemProps) {
  const base = clsx(
    "w-full px-3 py-2 text-sm rounded-md cursor-pointer",
    "hover:bg-slate-100 transition",
    "disabled:opacity-60",
    props.isRTL ? "text-right" : "text-left",
    props.className
  );

  const content = (
    <span
      className={clsx(
        "inline-flex w-full items-center justify-between gap-2",
        props.isRTL && "flex-row-reverse"
      )}
    >
      <span className="truncate">{props.label}</span>

      {props.type === "action" && props.isPending && (
        <ImSpinner10 className="h-4 w-4 animate-spin text-slate-500" />
      )}
    </span>
  );

  if (props.type === "link") {
    return (
      <li>
        <Link
          href={props.href}
          dir={props.isRTL ? "rtl" : "ltr"}
          onClick={props.onSelect}
          className={clsx("block", base)}
        >
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <form action={props.action} onSubmit={props.onSelect}>
        <input type="hidden" name="postId" value={props.postId} />
        <button
          type="submit"
          dir={props.isRTL ? "rtl" : "ltr"}
          disabled={props.isPending}
          className={clsx("block", base)}
        >
          {content}
        </button>
      </form>
    </li>
  );
}
