// app/blog/layout.tsx
import { BlogNotificationCenter } from "./ui/NotificationCenter";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BlogNotificationCenter />
    </>
  );
}
