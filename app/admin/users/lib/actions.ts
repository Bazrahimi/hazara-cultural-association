"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";

export async function toggleUserRole(formData: FormData) {
  // Make sure only admins can change roles
  const session = await requireUser();
  if (!session.roles?.includes("admin")) {
    throw new Error("Not authorized");
  }

  const userId = Number(formData.get("userId"));
  const roleName = String(formData.get("roleName") ?? "");
  const shouldHave = formData.get("shouldHave") === "true";

  if (!userId || !roleName) return;

  // Get role id from name
  const roleRows = await sql<{ id: number }[]>`
    SELECT id FROM roles WHERE name = ${roleName} LIMIT 1;
  `;
  const roleId = roleRows[0]?.id;
  if (!roleId) {
    throw new Error(`Role not found: ${roleName}`);
  }

  if (shouldHave) {
    // Grant role (ignore if already exists)
    await sql`
      INSERT INTO user_roles (user_id, role_id)
      VALUES (${userId}, ${roleId})
      ON CONFLICT DO NOTHING;
    `;
  } else {
    // Revoke role
    await sql`
      DELETE FROM user_roles
      WHERE user_id = ${userId} AND role_id = ${roleId};
    `;
  }
}
