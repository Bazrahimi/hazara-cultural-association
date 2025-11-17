import { requireUser } from "@/app/lib/session";
import { notFound } from "next/navigation";
import BlogPost from "./ui/BlogPost";

const NewBlog = async () => {
  const session = await requireUser();

  const canPost =
    session.roles.includes("admin") || session.roles.includes("blogger");

  if (!canPost) {
    notFound();
  }

  return <BlogPost />;
};

export default NewBlog;
