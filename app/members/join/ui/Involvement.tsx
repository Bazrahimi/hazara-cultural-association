// app/members/join/ui/Involvement.tsx (or similar)

import { Checkbox } from "@/app/ui/global/Checkbox";
import { Header } from "@/app/ui/global/Header";
import { PROFILE_FIELDS as f } from "../../_lib/constant";
import { ProfileRow } from "../../_lib/definitions";
import { MemberInput } from "../lib/definitions";
type Props = {
  errors?: Partial<Record<keyof MemberInput, string[]>>;
  p?: ProfileRow;
};

const Involvement = ({ errors, p }: Props) => {
  return (
    <div className="space-y-3">
      <div className="mb-10">
        <Header as="h2" size="md" align="center">
          How would you like to be involved?
        </Header>

        <p className="text-sm text-gray-700">
          HCA has a blog and a modern online marketplace to share news, amplify
          the voices of those who are often silenced, and help the community
          find culturally relevant services, products, and stories.
        </p>
      </div>

      <div className="space-y-2">
        <Checkbox
          id={f.interestBlog}
          label="I would like to contribute articles or blog posts."
          defaultChecked={!!p?.interestBlog}
          error={errors?.interestBlog}
        />

        <Checkbox
          id={f.interestStore}
          label="I am interested in having my own page/store."
          defaultChecked={!!p?.interestStore}
          error={errors?.interestStore}
        />

        <Checkbox
          id={f.virtualMeetingOptIn}
          label="Join virtual meetings / online gatherings"
          description="Workshops, community discussions, and Zoom events."
          defaultChecked={!!p?.virtualMeetingOptIn}
          error={errors?.virtualMeetingOptIn}
        />

        <Checkbox
          id={f.newsletterOptIn}
          label="Subscribe to monthly newsletter"
          description="Community updates, events, and important notices."
          defaultChecked={!!p?.newsletterOptIn}
          error={errors?.newsletterOptIn}
        />
      </div>
    </div>
  );
};

export default Involvement;
