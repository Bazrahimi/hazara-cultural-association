// app/members/join/page.tsx
import { redirectToLoginWithNext } from "@/app/_lib/session/authRedirects";
import { getSession } from "@/app/_lib/session/session";
import { getDefaultAddressRow, getUserProfileRow } from "../_lib/data";
import JoinForm from "./ui/JoinForm";

const page = async () => {
  const session = await getSession();

  if (!session?.userId) {
    await redirectToLoginWithNext("/members/join");
  }

  const userId = session!.userId;

  const [profile, address] = await Promise.all([
    getUserProfileRow(userId),
    getDefaultAddressRow(userId),
  ]);

  return <JoinForm profile={profile} address={address} />;
};

export default page;
