// app/blog/lib/permissions.ts

export type SessionLike = {
  userId: number;
  roles: string[];
};

/**
 * Can this user create or edit any blog post at all?
 * (Used to gate access to create/edit actions)
 */
export function canCreateOrEditPosts(
  session: SessionLike | null | undefined
): boolean {
  if (!session) return false;
  return session.roles.includes("admin") || session.roles.includes("blogger");
}

/**
 * Can this user manage a specific post (edit/delete)?
 * - Admins: can manage any post
 * - Bloggers: can only manage their own posts
 */
export function canManagePost(
  session: SessionLike | null | undefined,
  postAuthorId: number
): boolean {
  if (!session) return false;

  if (session.roles.includes("admin")) {
    return true;
  }

  if (!session.roles.includes("blogger")) {
    return false;
  }

  return session.userId === postAuthorId;
}
