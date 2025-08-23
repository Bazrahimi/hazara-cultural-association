// app/blogs/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & Events | Hazara Cultural Association",
  description:
    "Articles, news, advocacy updates, and upcoming events from the Hazara Cultural Association.",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
