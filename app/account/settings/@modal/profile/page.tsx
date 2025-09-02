// app/account/settings/@modal/(..)profile/page.tsx
import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import type { ProfileRecord } from "../../lib/definitions";
import Modal from "../../ui/Modal";

import { Header } from "@/app/ui/global/Header";
import ProfileForm from "./ProfileFrom";

export default async function ProfileModal() {
  const { userId } = await requireUser();

  const rows = await sql<ProfileRecord[]>`
    SELECT
      first_name AS "firstName",
      last_name  AS "lastName",
      phone      AS "contactNumber"
    FROM user_profiles
    WHERE user_id = ${userId}
    LIMIT 1;
  `;
  const initial = rows[0] ?? { firstName: "", lastName: "", contactNumber: "" };

  return (
    <Modal title="Edit Profile">
      <div className="space-y-4">
        <Header as="h2" size="sm">Profile</Header>
        <ProfileForm initial={initial} />
      </div>
    </Modal>
  );
}
