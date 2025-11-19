// app/account/ui/DashboardCard.tsx
import Link from "next/link";
import * as React from "react";

export function DashboardCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-xl border border-gray-200 bg-white p-5 shadow-sm " +
        (className ?? "")
      }
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function DashboardActionLink({
  href,
  Icon,
  label,
  desc,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-lg border border-transparent p-3 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
    >
      <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200">
        <Icon className="h-4 w-4 text-blue-700" />
      </span>
      <span>
        <span className="block text-sm font-medium text-gray-900 group-hover:text-blue-700">
          {label}
        </span>
        {desc && <span className="block text-xs text-gray-500">{desc}</span>}
      </span>
    </Link>
  );
}
