// app/blog/ui/ProfilePosts.tsx
import PostsSection from "@/app/blog/ui/posts/PostsSection";
import PostsSectionSkeleton from "@/app/blog/ui/posts/PostsSectionSkeleton";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import TricolorRule from "@/app/ui/global/TricolorRule";
import { Suspense } from "react";

const heading = "Profile Page";
const desc = "This is the page for the Blogger";

type Props = {
  limit: number;
  profileId: number;
  profileName: string;
};

const ProfilePosts = async ({ limit, profileId }: Props) => {
  return (
    <section>
      <div className="mb-6">
        <Header as="h3" size="sm" className="text-hca-blue-dark mb-1">
          {heading}
        </Header>
        <P className="text-sm text-gray-600">{desc}</P>
      </div>

      <Suspense fallback={<PostsSectionSkeleton cardCount={limit} />}>
        <PostsSection mode="author" authorId={profileId} limit={limit} />
      </Suspense>
      <TricolorRule className="mt-5" />
    </section>
  );
};

export default ProfilePosts;
