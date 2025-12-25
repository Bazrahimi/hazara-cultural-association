"use client";

import Link from "next/link";

type CommonProps = {
  isRTL: boolean;
  label: string;
  className?: string;
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
  const base =
    `block w-full px-3 py-2 hover:bg-slate-100 disabled:opacity-60 ` +
    (props.isRTL ? "text-right" : "text-left");

  if (props.type === "link") {
    return (
      <li>
        <Link
          href={props.href}
          dir={props.isRTL ? "rtl" : "ltr"}
          className={base}
        >
          {props.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <form action={props.action}>
        <input type="hidden" name="postId" value={props.postId} />
        <button
          type="submit"
          disabled={props.isPending}
          className={base}
        >
          {props.label}
        </button>
      </form>
    </li>
  );
}
