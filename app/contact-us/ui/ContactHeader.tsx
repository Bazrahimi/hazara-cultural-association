import { DonateRoutes } from "@/app/_lib/routes";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

import { Button } from "@/app/ui/global/components";
import type { IconType } from "react-icons";
import {
  MdCampaign,
  MdEmail,
  MdEvent,
  MdFavorite,
  // MdLocationOn,
  MdPeople,
  MdSchool,
  MdVolunteerActivism,
} from "react-icons/md";

type HeaderProps = {
  title?: string;
  blurb?: string;
  phone?: string;
  email?: string;
  address?: string;
};

// Single source of truth for labels + blurbs
const QUERY_INFO: {
  label: string;
  blurb: string;
  Icon: IconType;
}[] = [
  {
    label: "Donations & Support",
    blurb:
      "Contribute financially or in-kind to sustain HCA’s programs—cultural activities, advocacy, and community assistance.",
    Icon: MdFavorite,
  },
  {
    label: "Volunteering",
    blurb:
      "New volunteers are always welcome! Help with events, teaching, fundraising, mentoring, or day-to-day operations.",
    Icon: MdVolunteerActivism,
  },
  {
    label: "Cultural Programs & Classes",
    blurb:
      "We collaborate with partner organisations to revive Hazara heritage, strengthen community identity, and run classes/workshops.",
    Icon: MdSchool,
  },
  {
    label: "Events & Community Gatherings",
    blurb:
      "Ask about upcoming events and festivals—or propose a gathering you’d like HCA to host with you.",
    Icon: MdEvent,
  },
  {
    label: "Family Assistance / Community Support",
    blurb:
      "If you or your family need information, referrals, or support services, we’ll connect you with the right help.",
    Icon: MdPeople,
  },
  {
    label: "Advocacy & Media Enquiries",
    blurb:
      "HCA works with other organisations to advocate for Hazara people, including efforts toward official genocide recognition.",
    Icon: MdCampaign,
  },
];

export default function ContactHeader({
  title,
  blurb,

  email,
  // address,
}: HeaderProps) {
  return (
    <>
      {/* Header / blurb */}
      <div className="flex items-start gap-3">
        <div>
          <Header align="center" as="h2">
            {title}
          </Header>
          <P className="mt-1 text-gray-700">{blurb}</P>
        </div>
      </div>

      {/* Quick org details */}
      <div className="mt-3 grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-800 sm:grid-cols-2">
        {/* <P size="sm" className="flex items-center gap-2">
          <MdPhone className="text-gray-600" aria-hidden />
          <span>Phone: {phone}</span>
        </P> */}
        <P size="sm" className="flex items-center gap-2">
          <MdEmail className="text-gray-600" aria-hidden />
          <span>Email: {email}</span>
        </P>
        {/* <P
          size="sm"
          className="col-span-1 flex items-center gap-2 sm:col-span-2"
        >
          <MdLocationOn className="text-gray-600" aria-hidden />
          <span>{address}</span>
        </P> */}
      </div>

      {/* Non-profit support message */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <Header as="h3" size="sm" align="left">
          Supporting HCA
        </Header>
        <P className="mt-2 text-gray-700">
          HCA is a not-for-profit organisation serving the community. Our work
          relies on <strong>donations</strong> and the time of{" "}
          <strong>volunteers</strong>. By supporting HCA, you help preserve
          Hazara culture, strengthen our community, and advocate for justice.
        </P>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button as="link" variant="outline" href={DonateRoutes.root()}>
            <MdFavorite className="mr-1" aria-hidden /> Donate
          </Button>
          <Button as="link" variant="outline" href="/shop">
            Visit Shop
          </Button>
          {/* Optional direct volunteer CTA if you have a route */}
          <Button as="link" variant="outline" href="/volunteer">
            <MdVolunteerActivism className="mr-1" aria-hidden /> Volunteer
          </Button>
        </div>
      </div>

      {/* About enquiry types */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <Header as="h3" size="sm" align="left">
          About enquiry types
        </Header>
        <ul className="mt-3 space-y-3">
          {QUERY_INFO.map(({ label, blurb, Icon }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 shrink-0 text-gray-600" aria-hidden />
              <div>
                <P className="font-medium text-gray-900">{label}</P>
                <P className="text-gray-700">{blurb}</P>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
