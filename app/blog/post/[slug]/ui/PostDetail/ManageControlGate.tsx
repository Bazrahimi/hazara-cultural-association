import { getSession } from "@/app/lib/session/session";
import type { PostActionMenuProps } from "../ManagePostControls";
import { ManagePostControls } from "../ManagePostControls";
import { formatDateTimeAU } from "@/app/lib/Date";

type Props = PostActionMenuProps & {
  userId: number;
};
const ManageControlGate = async ({
  postId,
  slug,
  statusCode,
  isFeatured,
  isRTL,
  userId,
  updatedAt,
}: Props) => {
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
