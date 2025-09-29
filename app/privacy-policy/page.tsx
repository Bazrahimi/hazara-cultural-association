// app/privacy-policy/page.tsx
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

export const metadata = {
  title: "Privacy Policy | Hazara Cultural Association (HCA)",
  description:
    "Explains what we collect, how we use it, and your choices. We don’t store card data and we hash passwords.",
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
            The Hazara Cultural Association (HCA) is a community-driven,
            volunteer-led nonprofit based in Melbourne’s South-Eastern suburbs.
            We are committed to protecting your privacy.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            2) What Information We Collect
          </Header>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <strong>Contact details:</strong> name, email address, and contact
              number.
            </li>
            <li>
              <strong>Account data:</strong> login email/username.{" "}
              <em>Passwords are hashed</em> and never stored in plain text.
            </li>
            <li>
              <strong>Donations:</strong> processed by third-party providers
              (e.g., Stripe). We receive transaction references and amounts but
              <em> not full card numbers</em>.
            </li>
            <li>
              <strong>Usage data:</strong> basic analytics and cookies to
              improve site performance (non-sensitive).
            </li>
          </ul>
        </div>

        <div>
          <Header as="h2" size="sm">
            3) How We Use Your Information
          </Header>
          <ul className="list-disc pl-6 text-gray-700">
            <li>To provide our website, programs, and member services.</li>
            <li>To manage donations, receipts, and acknowledgements.</li>
            <li>To communicate updates, events, and opportunities.</li>
            <li>To maintain security and prevent fraud or misuse.</li>
            <li>To improve the site and user experience.</li>
          </ul>
        </div>

        <div>
          <Header as="h2" size="sm">
            4) Payment Processing (Stripe)
          </Header>
          <P>
            Donations are completed off-site on Stripe’s secure checkout. Stripe
            collects and processes your payment details and may store your data
            on servers outside Australia. HCA does not store card numbers.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            5) Sharing Your Information
          </Header>
          <P>
            We do <strong>not</strong> sell your personal information. We may
            share limited data with trusted service providers (e.g., email,
            hosting, analytics, payment processors) solely to operate our
            services, under appropriate safeguards.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            6) Data Security
          </Header>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Passwords are hashed; access is role-based and limited.</li>
            <li>Transport security (HTTPS) and routine maintenance.</li>
            <li>
              We only retain data as long as needed for our purposes or as
              required by law.
            </li>
          </ul>
        </div>

        <div>
          <Header as="h2" size="sm">
            7) Your Choices & Rights
          </Header>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of non-essential communications.</li>
            <li>
              To exercise these rights, contact{" "}
              <a
                className="text-blue-600 hover:underline"
                href="mailto:info@hazara.org.au"
              >
                info@hazara.org.au
              </a>
              .
            </li>
          </ul>
        </div>

        <div>
          <Header as="h2" size="sm">
            8) Cookies & Analytics
          </Header>
          <P>
            We may use essential cookies for site operation and lightweight
            analytics to understand usage patterns. You can adjust cookie
            settings in your browser.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            9) International Transfers
          </Header>
          <P>
            Some providers (e.g., payment processors) may store or process
            information outside Australia. We take reasonable steps to ensure
            appropriate protections for such transfers.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            10) Children
          </Header>
          <P>
            Our site is intended for general audiences. If you believe a child
            has provided personal information without consent, please contact us
            and we will take appropriate steps.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            11) Changes to This Policy
          </Header>
          <P>
            We may update this Privacy Policy from time to time. The “Last
            updated” date will reflect the latest changes.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            12) Contact
          </Header>
          <P>
            Questions or requests? Contact{" "}
            <a
              className="text-blue-600 hover:underline"
              href="mailto:info@hazara.org.au"
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
