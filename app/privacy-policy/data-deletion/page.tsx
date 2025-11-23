// app/privacy/data-deletion/page.tsx
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

export const metadata = {
  title: "Data Deletion | Hazara Cultural Association (HCA)",
  description:
    "How to request deletion of your Hazara Cultural Association (HCA) account and personal data, including Facebook Login users.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Header as="h1" align="center">
        Data Deletion Instructions
      </Header>
      <P className="mt-2 text-center text-sm text-gray-500">
        Last updated: 24 November 2025
      </P>

      <section className="mt-8 space-y-6">
        <div>
          <Header as="h2" size="sm">
            1) Overview
          </Header>
          <P>
            The Hazara Cultural Association (HCA) is committed to respecting
            your privacy. This page explains how you can request deletion of
            your HCA account and associated personal data, including accounts
            created via Facebook Login or Google Sign-In.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            2) What will be deleted
          </Header>
          <P>When we process a deletion request, we will:</P>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Delete or anonymise your HCA account record;</li>
            <li>
              Remove or anonymise personal profile details such as your name,
              email address, and contact number where stored in our systems;
            </li>
            <li>
              Remove social-login links (for example, between your Facebook or
              Google account and your HCA account).
            </li>
          </ul>
          <P className="mt-2 text-sm text-gray-600">
            Certain information may be retained where we are legally required to
            keep it (for example, financial records of donations).
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            3) How to request deletion
          </Header>
          <P>
            To request deletion of your data, please email us at{" "}
            <a
              href="mailto:info@hazara.org.au"
              className="text-blue-600 hover:underline"
            >
              info@hazara.org.au
            </a>{" "}
            with the subject line <strong>“HCA Data Deletion Request”</strong>{" "}
            and include:
          </P>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Your full name (as used with HCA);</li>
            <li>
              The email address linked to your HCA account (and, if different,
              the email used for Facebook or Google);
            </li>
            <li>
              Whether you created your account via{" "}
              <strong>Facebook Login</strong>, <strong>Google</strong>, or by
              email/password; and
            </li>
            <li>Any additional details that help us locate your account.</li>
          </ul>
          <P className="mt-2">
            We may contact you to verify your identity before completing the
            deletion.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            4) Facebook Login users
          </Header>
          <P>
            If you signed up or logged in using <strong>Facebook Login</strong>,
            you can use the same email address above to request deletion of your
            HCA data. Once we process your request, we will remove the link
            between your Facebook account and our systems and delete or
            anonymise your HCA account data, subject to any legal retention
            requirements.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            5) Processing time
          </Header>
          <P>
            We aim to respond to all deletion requests within{" "}
            <strong>30 days</strong>. If your request is complex or requires us
            to retain certain records for legal reasons, we will explain this in
            our response.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            6) Questions
          </Header>
          <P>
            If you have any questions about data deletion or privacy at HCA,
            please contact us at{" "}
            <a
              href="mailto:info@hazara.org.au"
              className="text-blue-600 hover:underline"
            >
              info@hazara.org.au
            </a>
            .
          </P>
        </div>
      </section>
    </main>
  );
}
