import { getSession } from "@/app/_lib";
import BlogMenuClient from "./BlogMenuClient";

export type BlogMenuProps = {
  navLinkBase: string;
  navIcon: string;
  label?: string;
};

const BlogMenu = async (props: BlogMenuProps) => {
  const session = await getSession();
  const isAllowed = !!(
    session &&
    (session.roles.includes("admin") || session.roles.includes("blogger"))
  );

  return <BlogMenuClient {...props} isAllowed={isAllowed} />;
};

export default BlogMenu;
