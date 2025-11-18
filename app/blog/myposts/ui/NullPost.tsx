import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";

const NullPost = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 py-8">
      <Header as="h1" size="md">
        My Blog Posts
      </Header>
      <P>
        You haven&apos;t created any blog posts yet. Start by creating your
        first article or advocacy event.
      </P>

      <Link
        href="/blog/new"
        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Create your first post
      </Link>
    </div>
  );
};

export default NullPost;
