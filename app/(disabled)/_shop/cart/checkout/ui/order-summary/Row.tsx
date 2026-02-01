"use client";
import { P } from "@/app/_ui";
const Row = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => {
  return (
    <div className="flex w-full max-w-xs items-center justify-between">
      <P className={bold ? "font-bold" : ""}>{label}</P>
      <P className={bold ? "font-bold tabular-nums" : "tabular-nums"}>
        {value}
      </P>
    </div>
  );
};

export default Row;
