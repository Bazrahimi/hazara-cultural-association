//app/blog/new/page.tsx

import { getSession } from "@/app/_lib";
import { notFound } from "next/navigation";
import { createPost } from "../../../post/_lib/action";
import PostForm from "./ui/PostForm";

const NewBlog = async () => {
  const session = await getSession();

  if (session) {
    const canPost =
      session.roles.includes("admin") || session.roles.includes("blogger");

    if (!canPost) {
      notFound();
    }

    const isAllowed = session.roles.includes("admin") || session.userId === 2;

    return <PostForm mode="create" action={createPost} />;
  }
};

export default NewBlog;
