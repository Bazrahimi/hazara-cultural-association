// app/privacy-policy/page.tsx
import { ORG_PROFILE } from "@/app/_lib/org/profile";
import { PublicRoutes } from "@/app/_lib/routes";
import { Header, P } from "@/app/_ui";
export const metadata = {
  title: "Privacy Policy | " + ORG_PROFILE.orgName,
  description:
    "What we collect, how we use it, where we store it (Neon Postgres), password hashing, and breach response.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Header as="h1" align="center">
        Privacy Policy
      </Header>
      <P className="mt-2 text-center text-sm text-gray-500">
        Last updated: 29 September 2025
      </P>

      <section className="mt-8 space-y-6">
        <div>
          <Header as="h2" size="sm">
            1) Who We Are
          </Header>
          <P>
            The {ORG_PROFILE.orgName} is a community-driven, volunteer-led
            nonprofit based in Melbourne’s South-Eastern suburbs. We are
            committed to protecting your privacy.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            2) What We Collect
          </Header>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <strong>Contact details:</strong> name, email address, contact
              number.
            </li>
            <li>
              <strong>Account data:</strong> login email/username.{" "}
              <em>Passwords are hashed</em> and never stored in plain text.
            </li>
            <li>
              <strong>Donations:</strong> processed off-site by payment
              providers (e.g., Stripe). We receive transaction refs/amounts, not
              full card numbers.
            </li>
            <li>
              <strong>Usage data:</strong> basic analytics/cookies to improve
              performance (non-sensitive).
            </li>
          </ul>
        </div>

        <div>
          <Header as="h2" size="sm">
            2a) Social Logins (Google, Facebook)
          </Header>
          <P>
            If you choose to sign in with a social account (for example Google
            or Facebook), we receive limited profile information from that
            provider – typically your name, email address, and a profile ID. We
            do <strong>not</strong> receive your social account password.
          </P>
          <P className="mt-2">
            We use this information to create or link your HCA account so you
            can log in more easily. You can request deletion of your HCA account
            and associated data at any time (see{" "}
            <a
              href={PublicRoutes.privacyDataDeletion()}
              className="text-blue-600 hover:underline"
            >
              Data Deletion
            </a>{" "}
            for details, including Facebook login requests).
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            3) Where Your Data Is Stored (Neon Postgres)
          </Header>
          <P>
            We store personal data (e.g., names, emails, phone numbers,
            account/profile records) in a managed{" "}
            <strong>PostgreSQL database hosted by Neon</strong>. Passwords are
            stored as cryptographic hashes using a modern, industry-standard
            algorithm (e.g., bcrypt/Argon2); we do not keep plaintext passwords.
          </P>
          <P className="mt-2">
            Database access is restricted via least-privilege roles and
            environment-scoped credentials. Data is transmitted over HTTPS/TLS.
            We perform routine maintenance and keep system packages up to date.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            4) Payments (Stripe)
          </Header>
          <P>
            Donations are completed on Stripe’s secure checkout pages. Stripe
            collects and processes payment details and may store data on servers
            outside Australia. HCA never stores card numbers.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            5) Risks & Breach Response
          </Header>
          <P>
            No method of storage or transmission is 100% secure. Risks can
            include unauthorised access due to software vulnerabilities,
            credential compromise, misconfiguration, or third-party provider
            incidents.
          </P>
          <P className="mt-2">
            If we suspect a data breach, we will investigate, contain, and
            assess impact. Where required, we will notify affected individuals
            and relevant authorities under applicable laws (including
            Australia’s Notifiable Data Breaches scheme).
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            6) Sharing Your Information
          </Header>
          <P>
            We do <strong>not</strong> sell personal information. We may share
            limited data with trusted service providers (e.g., email, hosting,
            analytics, payment processors) solely to operate our services, under
            appropriate safeguards.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            7) Data Retention & Deletion
          </Header>
          <P>
            We retain data only as long as needed for our purposes or as
            required by law. You may request access, correction, or deletion of
            your personal information; we will action requests subject to legal
            obligations and technical feasibility.
          </P>
          <P className="mt-2">
            For data deletion instructions – including for accounts created via
            Facebook Login – please see our{" "}
            <a
              href={PublicRoutes.privacyDataDeletion()}
              className="text-blue-600 hover:underline"
            >
              Data Deletion page
            </a>
            .
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            8) International Transfers
          </Header>
          <P>
            Some providers (e.g., payment, email, analytics) may process data
            outside Australia. We take reasonable steps to ensure appropriate
            protections for such transfers.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            9) Cookies & Analytics
          </Header>
          <P>
            We may use essential cookies for site operation and lightweight
            analytics to understand usage. You can control cookies via your
            browser settings.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            10) Changes
          </Header>
          <P>
            We may update this Policy periodically. The “Last updated” date
            reflects the latest changes.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            11) Contact
          </Header>
          <P>
            Questions or requests? Email{" "}
            <a
              className="text-blue-600 hover:underline"
              href={`mailto:${ORG_PROFILE.email}`}
            >
              {ORG_PROFILE.email}
            </a>
            .
          </P>
        </div>
      </section>
    </main>
  );
}
