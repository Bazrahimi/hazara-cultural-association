import clsx from "clsx";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

export type StatusBannerProps = {
  ok?: boolean; // true => success, false => error
  message?: string; // optional override message
  className?: string;
};

export default function StatusBanner({
  ok,
  message,
  className,
}: StatusBannerProps) {
  // If nothing to show, render nothing
  if (ok === undefined && !message) return null;

  const base = "mt-3 flex items-start gap-2 rounded-md p-3 text-sm";
  const tone = ok
    ? "border border-green-200 bg-green-50 text-green-800"
    : "border border-red-200 bg-red-50 text-red-800";
  const Icon = ok ? HiCheckCircle : HiExclamationCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(base, tone, className)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="leading-5">
        {message ?? (ok ? "Your message was sent successfully." : message)}
      </p>
    </div>
  );
}
