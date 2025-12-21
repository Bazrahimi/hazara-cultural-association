// app/members/join/page.tsx
import { sql } from "@/app/lib/db";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import JoinForm from "./ui/JoinForm";
import type { MemberInput } from "./lib/definitions";
import { AuthRoutes } from "@/app/lib/routes";

const page = async () => {
  const session = await getSession();

  if (!session || !session.userId) {
    redirect(`${AuthRoutes.login()}?next=/members/join`);
  }

  const userId = session.userId;

  // 1) Load profile (if any)
  const [profile] = await sql<{
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    english_proficiency: number | null;
    hazaragi_proficiency: number | null;
    interest_blog: boolean | null;
    interest_store: boolean | null;
    newsletter_opt_in: boolean | null;
    virtual_meeting_opt_in: boolean | null;
  }[]>`
    SELECT
      first_name,
      last_name,
      phone,
      english_proficiency,
      hazaragi_proficiency,
      interest_blog,
      interest_store,
      newsletter_opt_in,
      virtual_meeting_opt_in
    FROM user_profiles
    WHERE user_id = ${userId}
  `;

  // 2) Load default address (if any)
  const [address] = await sql<{
    address1: string | null;
    address2: string | null;
    suburb: string | null;
    state_code: string | null;
    postcode: string | null;
    country: string | null;
  }[]>`
    SELECT
      address1,
      address2,
      suburb,
      state_code,
      postcode,
      country
    FROM user_addresses
    WHERE user_id = ${userId} AND is_default = true
  `;

  // 3) Map to MemberInput shape (partial)
  const initialData: Partial<MemberInput> = {
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
    phone: profile?.phone ?? "",
    englishProficiency: profile?.english_proficiency ?? undefined,
    farsiHazaragiProficiency: profile?.hazaragi_proficiency ?? undefined,
    interestBlog: profile?.interest_blog ?? false,
    interestStore: profile?.interest_store ?? false,
    newsletterOptIn: profile?.newsletter_opt_in ?? false,
    virtualMeetingOptIn: profile?.virtual_meeting_opt_in ?? false,

    address1: address?.address1 ?? "",
    address2: address?.address2 ?? "",
    suburb: address?.suburb ?? "",
    stateCode: (address?.state_code as MemberInput["stateCode"]) ?? undefined,
    postCode: address?.postcode ?? "",
    country: (address?.country as MemberInput["country"]) ?? "AU",
  };

  return <JoinForm initialData={initialData} />;
};

export default page;
