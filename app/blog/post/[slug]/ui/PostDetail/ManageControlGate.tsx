import { getSession } from "@/app/lib/session";
import { PostActionMenuProps } from "../ManagePostControls";
import { ManagePostControls } from "../ManagePostControls";

const ManageControlGate = async ({
  postId,
  slug,
  status,
  isFeatured,
  isRTL,
  updatedAt
  

}: PostActionMenuProps) => {
  const session = await getSession();
  const canManage =
    !!session &&
    (session.roles.includes("admin") || session.userId === postId);

    if (!canManage) return null;

  return (
    <ManagePostControls
      postId={postId}
      status={status}
      isFeatured={isFeatured}
      isRTL={isRTL}
      slug={slug}
      updatedAt={updatedAt}
    />
  );
};

export default ManageControlGate;
