// app/members/auth/join/page.tsx
import { MemberRoutes } from "@/app/_lib/routes";
import { redirectToLoginWithNext } from "@/app/_lib/session/authRedirects";
import { getSession } from "@/app/_lib";
import { getDefaultAddressRow, getUserProfileRow } from "../_lib/data";
import JoinForm from "./ui/JoinForm";

const page = async () => {
  const session = await getSession();

  if (!session?.userId) {
    await redirectToLoginWithNext(MemberRoutes.join());
  }

  const userId = session!.userId;

  const [profile, address] = await Promise.all([
    getUserProfileRow(userId),
    getDefaultAddressRow(userId),
  ]);

  return <JoinForm profile={profile} address={address} />;
};

export default page;
