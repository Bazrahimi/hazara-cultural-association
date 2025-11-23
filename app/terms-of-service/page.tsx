// app/terms-of-service/page.tsx
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

export const metadata = {
  title: "Terms of Service | Hazara Cultural Association (HCA)",
  description:
    "Simple terms governing your use of HCA’s website, programs, and donations.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Header as="h1" align="center">
        Terms of Service
      </Header>
      <P className="mt-2 text-center text-sm text-gray-500">
        Last updated: 29 September 2025
      </P>

      <section className="mt-8 space-y-6">
        <div>
          <Header as="h2" size="sm">
            1) Acceptance of Terms
          </Header>
          <P>
            By accessing this website and participating in our programs or
            making donations, you agree to these Terms. If you do not agree,
            please discontinue use.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            2) Who We Are
          </Header>
          <P>
            The Hazara Cultural Association (HCA) is a community-driven,
            volunteer-led nonprofit based in Melbourne’s South-Eastern suburbs.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            3) Accounts & Security
          </Header>
          <P>
            If you create an account (including via social login such as Google
            or Facebook), you are responsible for keeping your credentials and
            device secure and for all activity under your account. You agree to
            notify us of any unauthorised use.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            4) Donations & Payments
          </Header>
          <P>
            Donations may be processed by third-party payment providers (e.g.,
            Stripe). Payment processing occurs off-site on their secure pages.
            We do not store card numbers. You are responsible for providing
            accurate billing information. Donations are generally non-refundable
            except as required by law.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            5) Acceptable Use
          </Header>
          <ul className="list-disc pl-6 text-gray-700">
            <li>No unlawful, abusive, harassing, or defamatory content.</li>
            <li>No interference with site security or operation.</li>
            <li>
              No unauthorised scraping, data mining, or reverse engineering.
            </li>
          </ul>
        </div>

        <div>
          <Header as="h2" size="sm">
            6) Intellectual Property
          </Header>
          <P>
            Site content (text, images, logos) is owned by HCA or its
            contributors and protected by applicable laws. You may not reuse
            content without permission except for fair dealing/fair use.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            7) Third-Party Links
          </Header>
          <P>
            Our site may link to third-party websites (including payment
            processors). We are not responsible for their content or practices.
            Use them at your own discretion.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            8) Disclaimer
          </Header>
          <P>
            The site is provided “as is” and “as available.” To the maximum
            extent permitted by law, HCA disclaims all warranties, express or
            implied, including fitness for a particular purpose and
            non-infringement.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            9) Limitation of Liability
          </Header>
          <P>
            To the extent permitted by law, HCA is not liable for any indirect,
            incidental, special, or consequential damages arising from your use
            of the site or services.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            10) Changes to These Terms
          </Header>
          <P>
            We may update these Terms from time to time. The “Last updated” date
            will reflect the latest changes. Continued use constitutes
            acceptance of the revised terms.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            11) Governing Law
          </Header>
          <P>
            These Terms are governed by the laws of Victoria, Australia. Any
            disputes are subject to the exclusive jurisdiction of courts in
            Victoria.
          </P>
        </div>

        <div>
          <Header as="h2" size="sm">
            12) Contact
          </Header>
          <P>
            Questions about these Terms? Contact us at{" "}
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
