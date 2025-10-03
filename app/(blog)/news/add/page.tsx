// app/(blog)/news/add/page.tsx
import { getSession } from "@/app/lib/session";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import CreateNewsForm from "./ui/CreateNewsForm";

export default async function Page() {
  const session = await getSession();
  const isAllowed = Boolean(
    session?.roles?.some((r) => r === "admin" || r === "blogger")
  );

  if (!isAllowed) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Header as="h1">Add News</Header>
        <P>
          You don’t have permission to add news. Please sign in with an admin or
          blogger account.
        </P>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Header as="h1">Add News (Advocacy Update)</Header>
      <P>
        Post an advocacy update (e.g., meeting with a federal MP). Include a
        photo, agenda (e.g., refugee policy, official recognition of the Hazara
        genocide), and outcomes/next steps.
      </P>

      <div className="mt-8">
        <CreateNewsForm />
      </div>
    </main>
  );
}
