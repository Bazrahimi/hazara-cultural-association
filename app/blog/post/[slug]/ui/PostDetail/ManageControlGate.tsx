import { getSession } from "@/app/lib/session";
import type { PostActionMenuProps } from "../ManagePostControls";
import { ManagePostControls } from "../ManagePostControls";

type Props = PostActionMenuProps & {
  userId: number;
};
const ManageControlGate = async ({
  postId,
  slug,
  statusCode,
  isFeatured,
  isRTL,
  updatedAt,
  userId,
}: Props) => {
  console.log("isRTL", isRTL)
  const session = await getSession();
  const canManage =
    !!session && (session.roles.includes("admin") || session.userId === userId);

  if (!canManage) return null;

  return (
    <ManagePostControls
      postId={postId}
      statusCode={statusCode}
      isFeatured={isFeatured}
      isRTL={isRTL}
      slug={slug}
      updatedAt={updatedAt}
    />
  );
};

export default ManageControlGate;
