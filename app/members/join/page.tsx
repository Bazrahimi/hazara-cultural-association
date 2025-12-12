//app/members/join/page.tsx
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import JoinForm from "./ui/JoinForm";

const page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/u/login?next=/members/join");
  }

  return <JoinForm />;
};

export default page;
