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
    <main className="max-auto px-4 py-10">
      <section>
        <Header as="h1" size="md">
          HCA Membership Registration
        </Header>
        <P>
          Membership is open to people residing in Australia. A minimum fee of{" "}
          <span className="font-semibold">$10/year</span> applies to all
          members, including the executive team. If you are facing financial
          hardship, you can request a fee waiver below.
        </P>
        <div className="mt-6">
    <JoinForm />
        </div>
      </section>
    </main>
  );
};

export default page;
