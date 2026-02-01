// app/members/join/ui/Involvement.tsx (or similar)

import { Checkbox, Header, P } from "@/app/_ui";
import { PROFILE_FIELDS as f } from "../../_lib/constant";
import { ProfileRow } from "../../_lib/definitions";

import type { JoinState } from "../../_lib/definitions";
type Props = {
  state?: JoinState;
  initial?: ProfileRow;
};

const Involvement = ({ state, initial }: Props) => {
  const errors = state?.errors;
  return (
    <div className="space-y-3">
      <div className="mb-10">
        <Header as="h2" size="md" align="center">
          How would you like to be involved?
        </Header>

        <P className=" text-gray-700" size="sm">
          HCA has a blog and a modern online marketplace to share news, amplify
          the voices of those who are often silenced, and help the community
          find culturally relevant services, products, and stories.
        </P>
      </div>

      <div className="space-y-2">
        <Checkbox
          id={f.interestBlog}
          label="I would like to contribute articles or blog posts."
          defaultChecked={state?.data?.interestBlog ?? initial?.interestBlog}
          error={errors?.interestBlog}
        />

        <Checkbox
          id={f.virtualMeetingOptIn}
          label="Join virtual meetings / online gatherings"
          description="Workshops, community discussions, and Online Virtual Meetings."
          defaultChecked={
            state?.data?.virtualMeetingOptIn ?? initial?.virtualMeetingOptIn
          }
          error={errors?.virtualMeetingOptIn}
        />

        <Checkbox
          id={f.newsletterOptIn}
          label="Subscribe to monthly newsletter"
          description="Community updates, events, and important notices."
          defaultChecked={
            state?.data?.newsletterOptIn ?? initial?.newsletterOptIn
          }
          error={errors?.newsletterOptIn}
        />
      </div>
    </div>
  );
};

export default Involvement;
