// app/admin/page.tsx
import { Header } from "@/app/_ui";
import Link from "next/link";
import Breadcrumbs, {type Breadcrumb} from "@/app/_ui/Breadcrumbs";

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Admin Dashboard",
    href: "/admin",
    active: true,
  },
];

const adminSections = [
  {
    title: "User & role management",
    description:
      "Assign roles like admin, blogger, seller, and member to users.",
    href: "/admin/users/roles",
  },
  {
    title: "All blog posts",
    description:
      "Review, edit, and archive blog posts created by you and other users.",
    href: "/admin/all-blog-posts",
  },
  {
    title: "Website enquiries",
    description:
      "View and respond to contact form submissions and quick enquiries.",
    href: "/admin/website-queries",
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <div className="mt-6 space-y-4">
        <Header as="h1" size="md">
          Admin Console
        </Header>
        <p className="text-sm text-slate-600">
          Choose a section below to manage users, content, and website
          enquiries.
        </p>
      </div>

      {/* Navigation cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            <div>
              <h2 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                {section.title}
              </h2>
              <p className="mt-2 text-xs text-slate-600">
                {section.description}
              </p>
            </div>
            <span className="mt-4 text-xs font-medium text-blue-600 group-hover:underline">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
