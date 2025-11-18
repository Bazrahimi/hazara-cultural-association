import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

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

      <Button as="link" href="/blog/new" size="sm" variant="outline">
        Create your first Blog-Post
      </Button>
    </div>
  );
};

export default NullPost;
