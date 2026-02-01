// app/member/page.tsx
import { Button, Header, P } from "@/app/_ui";

import Link from "next/link";
import TermsAndPrivacyNotice from "../(term-and-privacy)/ui/TermsAndPrivacyNotice";
import { AuthRoutes, MemberRoutes } from "../_lib/routes";

const MembershipInfoPage = () => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="space-y-10">
        {/* Page title */}
        <Header as="h1" size="lg" align="center">
          HCA Membership
        </Header>

        {/* Overview */}
        <div className="mx-auto max-w-3xl space-y-4 text-gray-700">
          <P>
            Membership is open to people currently residing in Australia. You
            may choose either a{" "}
            <span className="font-semibold text-gray-900">$10 monthly</span>{" "}
            payment or a{" "}
            <span className="font-semibold text-gray-900">$115 annual</span>{" "}
            membership fee. These rates apply to all members, including the
            executive team.
          </P>

          <P>
            All membership income is used to support HCA programs—cultural
            events, community gatherings, educational workshops, advocacy
            campaigns, and the maintenance of our digital platforms (website,
            blog, and online marketplace). Executive members and volunteers are
            unpaid; your contribution goes directly back into the community.
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
          {/* Benefits */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Header as="h2" size="sm" align="center" className="mb-4">
              What you gain as a member
            </Header>

            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>
                <P>Priority updates on HCA events and programs.</P>
              </li>
              <li>
                <P>
                  Invitations to cultural gatherings, workshops, and community
                  consultations.
                </P>
              </li>
              <li>
                <P>
                  Opportunity to contribute blog posts, stories, and community
                  news.
                </P>
              </li>
              <li>
                <P>
                  Option to express interest in having your own page or store in
                  our online marketplace.
                </P>
              </li>
              <li>
                <P>
                  Monthly newsletters keeping you informed about HCA activities
                  and initiatives.
                </P>
              </li>
              <li>
                <P>
                  Access to announcements and information from government
                  agencies and partner organisations.
                </P>
              </li>
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Header as="h2" size="sm" align="center" className="mb-4">
              What we ask from members
            </Header>

            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>
                <P>
                  Respect for HCA’s values of dignity, inclusion, and safety.
                </P>
              </li>
              <li>
                <P>
                  Commitment to positive and constructive engagement with other
                  members.
                </P>
              </li>
              <li>
                <P>
                  Agreement to follow HCA policies, including Terms of Service
                  and Privacy Policy.
                </P>
              </li>
              <li>
                <P>
                  Payment of the membership fee (or approved fee waiver, if
                  applicable).
                </P>
              </li>
            </ul>

            <TermsAndPrivacyNotice
              className="mt-4 text-left text-xs text-gray-500"
              prefix="By becoming a member, you agree to our"
              size="xs"
            />
          </div>
        </div>

        {/* How membership works */}
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white px-8 py-10 text-gray-700 shadow-sm">
          <Header as="h2" size="sm" align="center" className="text-gray-900">
            How the membership process works
          </Header>

          <ol className="mt-6 list-decimal space-y-4 pl-6 text-sm">
            <li>
              <P>
                <Link
                  href={`${AuthRoutes.signUp()}?next=/members/join`}
                  className="font-medium text-hca-blue-main underline-offset-4 hover:underline"
                >
                  Create a new account
                </Link>{" "}
                if you’re joining HCA for the first time, or{" "}
                <Link
                  href={AuthRoutes.login()}
                  className="font-medium text-hca-blue-main underline-offset-4 hover:underline"
                >
                  log in
                </Link>{" "}
                if you already have an account.
              </P>
            </li>

            <li>
              <P>
                Complete the{" "}
                <Link
                  href={MemberRoutes.join()}
                  className="font-medium text-hca-blue-main underline-offset-4 hover:underline"
                >
                  membership form
                </Link>{" "}
                with your details.
              </P>
            </li>

            <li>
              <P>
                Our team reviews your application and confirms your membership
                status.
              </P>
            </li>

            <li>
              <P>
                Once approved, you’ll receive updates and invitations to
                participate in HCA activities.
              </P>
            </li>
          </ol>

          <div className="mt-10 flex justify-center">
            <Button
              as="link"
              href={MemberRoutes.join()}
              variant="secondary"
              size="lg"
            >
              Apply for membership
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default MembershipInfoPage;
