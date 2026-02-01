// app/about-us/ui/Acknowledgements.tsx
import { Header, P } from "@/app/_ui";
export default function Acknowledgements() {
  return (
    <section className="space-y-12 mt-10">
      {/* Acknowledgement of Country */}
      <section aria-labelledby="acknowledgement">
        <Header size="sm" as="h2">
          Acknowledgement of Country
        </Header>
        <P>
          We acknowledge the Traditional Owners of the lands on which we live,
          learn, and work, and pay our respects to Elders past and present. We
          recognise that sovereignty was never ceded.
        </P>
      </section>

      {/* Acknowledgement of Hazara History */}
      <section aria-labelledby="hazara-history">
        <Header size="sm" as="h2">
          Acknowledgement of Hazara History
        </Header>
        <P>
          We honour the generations of Hazara people who have endured more than
          a century of persecution, dispossession, and systematic attempts at
          erasure under consecutive Afghan state rulers. The ongoing Hazara
          genocide and ethnic cleansing have forced millions into displacement
          and statelessness, with many families born without a recognised
          homeland across Iran, Pakistan, Iraq, Turkey, Indonesia, and Malaysia.
        </P>
        <P>
          We acknowledge this pain as a living reality for our community and
          commit ourselves to truth-telling, cultural preservation, and the
          pursuit of dignity and justice for all Hazara people—wherever they may
          be.
        </P>
      </section>
    </section>
  );
}
