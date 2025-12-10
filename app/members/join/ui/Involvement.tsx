// app/members/join/ui/Involvement.tsx (or similar)

import { Checkbox } from "@/app/ui/global/Checkbox";
import { Header } from "@/app/ui/global/Header";
import { MemberInput } from "../lib/definitions";
type Props = {
  errors?: Partial<Record<keyof MemberInput, string[]>>;
  data?: Partial<MemberInput>;
};

const Involvement = ({ errors, data }: Props) => {
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
          id="interestBlog"
          label="I would like to contribute articles or blog posts."
          defaultChecked={!!data?.interestBlog}
          error={errors?.interestBlog}
        />

        <Checkbox
          id="interestStore"
          label="I am interested in having my own page/store."
          defaultChecked={!!data?.interestStore}
          error={errors?.interestStore}
        />

        <Checkbox
          id="virtualMeetingOptIn"
          label="Join virtual meetings / online gatherings"
          description="Workshops, community discussions, and Zoom events."
          defaultChecked={!!data?.virtualMeetingOptIn}
          error={errors?.virtualMeetingOptIn}
        />

        <Checkbox
          id="newsletterOptIn"
          label="Subscribe to monthly newsletter"
          description="Community updates, events, and important notices."
          defaultChecked={!!data?.newsletterOptIn}
          error={errors?.newsletterOptIn}
        />
      </div>
    </div>
  );
};

export default Involvement;
