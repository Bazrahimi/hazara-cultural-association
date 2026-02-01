// app/shop/ui/StepCard.tsx
"use client";

import { Button, Header } from "@/app/_ui";
import { ReactNode } from "react";

type Props = {
  title: string;
  expanded: boolean;
  summary?: ReactNode;
  children: ReactNode;
  onEdit?: () => void; // called when user clicks "Edit"
  canEdit?: boolean; // optionally hide Edit (defaults to true)
  className?: string;
};

export default function StepCard({
  title,
  expanded,
  summary,
  children,
  onEdit,
  canEdit = true,
  className = "",
}: Props) {
  return (
    <section
      className={`rounded-md border border-gray-200 ${expanded ? "p-4" : "p-4"} ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <Header as="h2" size="sm">
          {title}
        </Header>

        {/* Show Edit when the card is collapsed and editing is allowed */}
        {!expanded && canEdit && onEdit ? (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        ) : null}
      </div>

      {expanded ? (
        <div>{children}</div>
      ) : (
        <div className="text-sm text-gray-700">{summary}</div>
      )}
    </section>
  );
}
