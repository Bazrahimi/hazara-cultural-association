"use client";

import { cn } from "@/app/_lib/helper";
import { sendingRequest } from "@/app/_lib/translation/blog/post/transHelper";
import type { PostActionIntent } from "@/app/blog/post/lib/actionHelper";
import Link from "next/link";
import { ImSpinner10 } from "react-icons/im";

type CommonProps = {
  isRTL: boolean;
  label: string;
  className?: string;
  onSelect?: () => void;
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
  intent: PostActionIntent;
};

export type MenuItemProps = LinkItemProps | ActionItemProps;

export default function MenuItem(props: MenuItemProps) {
  const base = cn(
    "w-full px-3 py-2 text-sm rounded-md cursor-pointer transition",
    "hover:bg-hca-blue-light disabled:opacity-60",
    // alignment
    props.isRTL ? "text-right" : "text-left",
    props.className,
  );

  const loadingLabel = props.isRTL ? sendingRequest.rtl : sendingRequest.en;

  const labelText =
    props.type === "action" && props.isPending ? loadingLabel : props.label;

  const content = (
    <span
      className={cn(
        "inline-flex w-full items-center gap-2",
        // keep spinner at the edge
        "justify-between",
        props.isRTL && "flex-row-reverse",
      )}
    >
      <span
        className={cn(
          "flex-1 truncate",
          props.isRTL ? "text-right" : "text-left",
        )}
      >
        {labelText}
      </span>

      {props.type === "action" && props.isPending && (
        <ImSpinner10 className="h-4 w-4 shrink-0 animate-spin text-slate-500" />
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
          className={cn("block", base)}
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
        <input type="hidden" name="intent" value={props.intent} />
        <button
          type="submit"
          dir={props.isRTL ? "rtl" : "ltr"}
          disabled={props.type === "action" ? props.isPending : false}
          aria-busy={props.type === "action" ? props.isPending : undefined}
          className={cn("block", base)}
          onSelect={() => onselect}
        >
          {content}
        </button>
      </form>
    </li>
  );
}
