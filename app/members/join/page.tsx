import { getSession } from "@/app/lib/session";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { redirect } from "next/navigation";
import JoinForm from "./ui/JoinForm";

const page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/u/login?next=/members/join");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section>
        <Header as="h1" size="md">
          HCA Membership Registration
        </Header>

        <div className="mt-3 space-y-2 text-gray-700">
          <P>
            Membership is open to people currently residing in Australia. A
            minimum fee of <span className="font-semibold">$10/year</span>{" "}
            applies to all members, including the executive team.
          </P>

          <P>
            All membership income is used to support Hazara Cultural Association
            programs: cultural events, community gatherings, educational
            workshops, advocacy campaigns, and maintaining our online platforms
            (website, blog, and modern online marketplace). Executive members
            and volunteers are unpaid; your contribution goes directly back into
            the community.
          </P>

          <P>
            As part of your membership, you can help keep our community
            connected: HCA has built a blog to share news and lived experiences,
            and a modern online marketplace where community members can showcase
            Hazara culture, art, and small businesses. If you’re interested in
            having your own page or store, you can tell us in the form below.
          </P>
        </div>

        <div className="mt-6">
          <JoinForm />
        </div>
      </section>
    </main>
  );
};

export default page;
