// app/members/join/ui/Involvement.tsx (or similar)

import { Checkbox } from "@/app/ui/global/Checkbox";
import { MemberInput } from "../lib/definitions";
type Props = {
  errors?: Partial<Record<keyof MemberInput, string[]>>;
  data?: Partial<MemberInput>;
};

const Involvement = ({ errors, data }: Props) => {
  return (
    <>
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
          id="newsletterOptIn"
          label="Subscribe to monthly newsletter"
          description="Community updates, events, and important notices."
          defaultChecked={!!data?.newsletterOptIn}
          error={errors?.newsletterOptIn}
        />

        <Checkbox
          id="virtualMeetingOptIn"
          label="Join virtual meetings / online gatherings"
          description="Workshops, community discussions, and Zoom events."
          defaultChecked={!!data?.virtualMeetingOptIn}
          error={errors?.virtualMeetingOptIn}
        />
      </div>
    </>
  );
};

export default Involvement;
