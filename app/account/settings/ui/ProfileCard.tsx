// app/account/settings/ui/ProfileCard.tsx
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";

type Props = {
  email: string;
  profile: {
    firstName: string | null;
    lastName: string | null;
    contactNumber: string | null;
  };
};

export default function ProfileCard({ email, profile }: Props) {
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
          href="/account/settings/profile"
          variant="outline"
          size="sm"
        >
          {profileComplete ? "Edit" : "Add details"}
        </Button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          <span className="font-medium">Email: </span>
          <span className="text-gray-700">{email || "—"}</span>
        </div>
        <div>
          <span className="font-medium">First name: </span>
          <span className="text-gray-700">{profile.firstName || "—"}</span>
        </div>
        <div>
          <span className="font-medium">Last name: </span>
          <span className="text-gray-700">{profile.lastName || "—"}</span>
        </div>
        <div>
          <span className="font-medium">Phone: </span>
          <span className="text-gray-700">{profile.contactNumber || "—"}</span>
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
