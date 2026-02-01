import { Header, P } from "@/app/_ui";
import { FaCheck } from "react-icons/fa";

const ITEMS = [
  "Advocate for recognition of the Hazara genocide and promote human rights protections for all communities.",
  "Host cultural festivals, exhibitions, and community gatherings in Melbourne’s South-East to strengthen unity and celebrate Hazara heritage.",
  "Offer language, history, and youth programs that preserve culture and empower the next generation.",
  "Provide a community blog platform for publishing news, events, advocacy updates, and human-rights stories that amplify community voices.",
  "Operate the HCA Marketplace, enabling community members to sell cultural items, handmade crafts, and heritage products.",
  "Promote social cohesion by encouraging participation, volunteerism, and collaboration across diverse communities.",
  "Run talks, workshops, and educational programs for schools and community groups to raise awareness and promote understanding.",
  "Support families with local networks, referrals, and community-based initiatives that improve wellbeing and belonging.",
];

export default function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do">
      <Header size="sm" as="h2" id="what-we-do">
        What We Do
      </Header>

      <ul className="mt-4 space-y-3 text-gray-700">
        {ITEMS.map((text, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <FaCheck className="text-green-600 mt-1 h-4 w-4 flex-shrink-0 ml-5" />
            <P size="sm">{text}</P>
          </li>
        ))}
      </ul>
    </section>
  );
}
