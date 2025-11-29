// app/members/join/ui/Involvement.tsx (or similar)

import { Checkbox } from "@/app/ui/global/Checkbox";

const Involvement = () => {
  return (
    <>
      <div className="space-y-2">
        <Checkbox
          id="interestBlog"
          label="I would like to contribute articles or blog posts."
        />

        <Checkbox
          id="interestStore"
          label="I am interested in having my own page/store."
        />

        <Checkbox
          id="newsletterOptIn"
          label="Subscribe to monthly newsletter"
          description="Community updates, events, and important notices."
        />

        <Checkbox
          id="virtualMeetingOptIn"
          label="Join virtual meetings / online gatherings"
          description="Workshops, community discussions, and Zoom events."
        />
      </div>
    </>
  );
};

export default Involvement;
