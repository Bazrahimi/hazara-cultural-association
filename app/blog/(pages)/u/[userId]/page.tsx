// app/blog/(pages)/u/[userId]/page.tsx
import AuthorBlogPosts from "../../ui/AuthorBlogPosts";



const  AuthorPublicPostsPage = async({ params }: { params: Promise<{ userId: string }> }) => {
  const {userId} = await params;

  const authorId = Number(userId)

  console.log("authpage");

  // Very basic guard; you can add 404 handling if NaN
  if (Number.isNaN(authorId)) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-center text-sm text-gray-600">
          Invalid author identifier.
        </p>
      </main>
    );
  }

  return <AuthorBlogPosts authorId={authorId} />;
}

export default AuthorPublicPostsPage