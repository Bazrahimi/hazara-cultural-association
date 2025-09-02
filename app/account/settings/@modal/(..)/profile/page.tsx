import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import { ProfileRecord } from "../../../lib/definitions";

import ProfileForm from "../../../profile/ProfileFrom";
import Modal from "../../../ui/Modal";

export const dynamic = "force-dynamic"; // optional: avoid caching modal loads

export default async function ProfileModal() {
  const { userId } = await requireUser();

  const rows = await sql<ProfileRecord[]>`
    SELECT first_name AS "firstName", last_name AS "lastName", phone AS "contactNumber"
    FROM user_profiles
    WHERE user_id = ${userId}
    LIMIT 1
  `;
  const initial = rows[0] ?? { firstName: "", lastName: "", contactNumber: "" };

  return (
    <Modal title="Edit Profile">
      <ProfileForm initial={initial} />
    </Modal>
  );
}
