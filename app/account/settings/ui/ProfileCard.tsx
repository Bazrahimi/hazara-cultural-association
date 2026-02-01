import { AccountRoutes } from "@/app/_lib/routes";
import { Button, Header } from "@/app/_ui";
import { use } from "react";
import { ProfileRecord, userRecord } from "../lib/definitions";

export default function ProfileCard({
  userPromise,
  profilePromise,
}: {
  userPromise: Promise<userRecord[]>;
  profilePromise: Promise<ProfileRecord[]>;
}) {
  const userRows = use(userPromise);
  const profileRows = use(profilePromise);

  const email = userRows[0]?.email ?? "";
  const profile = profileRows[0] ?? {
    firstName: null,
    lastName: null,
    contactNumber: null,
  };
  const profileComplete =
    !!profile.firstName && !!profile.lastName && !!profile.contactNumber;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <Header as="h2" size="sm">
          Profile
        </Header>
        <Button
          as="link"
          href={AccountRoutes.profile()}
          variant="outline"
          size="sm"
        >
          {profileComplete ? "Edit" : "Add details"}
        </Button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          <span className="font-medium">Email: </span>
          {email || "—"}
        </div>
        <div>
          <span className="font-medium">First name: </span>
          {profile.firstName || "—"}
        </div>
        <div>
          <span className="font-medium">Last name: </span>
          {profile.lastName || "—"}
        </div>
        <div>
          <span className="font-medium">Phone: </span>
          {profile.contactNumber || "—"}
        </div>
      </div>

      {!profileComplete && (
        <p className="mt-3 text-xs text-amber-700">
          Add your name and phone so we can contact you about orders if needed.
        </p>
      )}
    </section>
  );
}
