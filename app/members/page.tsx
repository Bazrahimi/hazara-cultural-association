// app/member/page.tsx
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import TermsAndPrivacyNotice from "../(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { PublicRoutes } from "../lib/routes";
import { Button } from "../ui/global/components";

const MembershipInfoPage = () => {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="space-y-6">
        <Header as="h1" size="lg">
          HCA Membership
        </Header>

        {/* Overview */}
        <div className="space-y-3 text-gray-700">
          <P>
            Membership is open to people currently residing in Australia. You
            may choose either a{" "}
            <span className="font-semibold">$10 monthly</span> payment or a{" "}
            <span className="font-semibold">$115 annual</span> membership fee.
            These rates apply to all members, including the executive team.
          </P>

          <P>
            All membership income is used to support HCA programs: cultural
            events, community gatherings, educational workshops, advocacy
            campaigns, and maintaining our online platforms and other digital
            tools (website, blog, and modern online marketplace). Executive
            members and volunteers are unpaid; your contribution goes directly
            back into the community.
          </P>

          <P>
            As a member, you help keep our community connected. HCA provides a
            space to share news and lived experiences, and a modern online
            marketplace where community members can showcase Hazara culture,
            art, and small businesses.
          </P>
        </div>

        {/* Benefits / responsibilities */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-sm font-semibold text-gray-900">
              What you gain as a member
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li>Priority updates on HCA events and programs.</li>
              <li>
                Invitations to cultural gatherings, workshops, and community
                consultations.
              </li>
              <li>
                Opportunity to contribute blog posts, stories, and community
                news.
              </li>
              <li>
                Option to express interest in having your own page or store in
                our online marketplace.
              </li>

              {/* New items */}
              <li>
                Monthly and regular newsletters keeping you informed about HCA
                activities, community initiatives, and important updates.
              </li>
              <li>
                Access to relevant announcements, programs, and information
                shared by Australian government agencies, community services,
                and partner organisations — helping strengthen the connection
                between the Hazara community and key institutions.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-sm font-semibold text-gray-900">
              What we ask from members
            </h2>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li>
                Respect for HCA’s values of dignity, inclusion, and safety.
              </li>
              <li>
                Commitment to positive, constructive engagement with other
                members.
              </li>
              <li>
                Agreement to follow HCA policies, including our Terms of Service
                and Privacy Policy.
              </li>
              <li>
                Payment of the annual membership fee (or approved fee waiver, if
                applicable).
              </li>
            </ul>

            {/* Terms notice added HERE */}
            <TermsAndPrivacyNotice
              className="mt-3 text-left text-xs text-gray-600"
              prefix="By becoming a member, you agree to our"
              size="xs"
            />
          </div>
        </div>

        {/* How membership works */}
        <section className="space-y-2 text-gray-700">
          <h2 className="text-sm font-semibold text-gray-900">
            How the membership process works
          </h2>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            <li>Log in or create an account on the HCA website.</li>
            <li>Complete the membership form with your details.</li>
            <li>
              Our team reviews your application and confirms your membership
              status.
            </li>
            <li>
              Once approved, you&apos;ll receive updates and invitations to
              participate in HCA activities.
            </li>
          </ol>
        </section>

        <Button as="link" href={PublicRoutes.joinMember()} variant="secondary">
          Apply for membership
        </Button>
      </section>
    </main>
  );
};

export default MembershipInfoPage;
