import React from 'react'
import { Header } from '@/app/ui/global/Header';
import { Button } from '@/app/ui/global/components';
import { Suspense } from 'react';
import PostsLoadingFallback from '@/app/blog/myposts/ui/PostsLoadingFallback';
import PostsWrapper from '@/app/blog/myposts/ui/PostsWrapper';
import { requireUser } from '@/app/lib/session';

const AdminAllBlockPostsPage = async () => {
  const session = await requireUser();
  const { userId, roles } = session;

  const isAdmin = roles.includes("admin");

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header as="h1" size="md">
          {isAdmin ? "All Blog Posts" : "My Blog Posts"}
        </Header>

        <Button size="sm" as="link" href="/blog/new" variant="outline">
          Create New Post
        </Button>
      </div>

      <Suspense fallback={<PostsLoadingFallback />}>
        <PostsWrapper userId={userId} isAdmin={isAdmin} />
      </Suspense>
    </div>
  );
};


export default AdminAllBlockPostsPage