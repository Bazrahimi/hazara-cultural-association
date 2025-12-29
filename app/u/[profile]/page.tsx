// app/blog/(pages)/u/[userId]/page.tsx

import ProfilePosts from "./ui/ProfilePosts";

const AuthorPublicPostsPage = async ({
  params,
}: {
  params: Promise<{ profile: string }>;
}) => {
  const { profile } = await params;

  const parts = profile.split("-");

  const profileName = parts
    .slice(0, -1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const profileId = Number(parts[parts.length - 1]);

  return (
    <ProfilePosts profileId={profileId} profileName={profileName} limit={20} />
  );
};

export default AuthorPublicPostsPage;
