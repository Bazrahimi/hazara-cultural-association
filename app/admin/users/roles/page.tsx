// app/admin/UserRoleAdminSection.tsx
import { sql } from "@/app/lib/db";
import { toggleUserRole } from "./lib/actions";

type UserRow = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
};

type RoleRow = {
  id: number;
  name: string;
};

export default async function UserRoleAdminSection() {
  // All available roles (from your CHECK constraint)
  const roleRows = await sql<RoleRow[]>`
    SELECT id, name
    FROM roles
    ORDER BY name;
  `;

  // Users + profile + aggregated roles
  const users = await sql<UserRow[]>`
    SELECT
      u.id,
      u.email,
      up.first_name AS "firstName",
      up.last_name  AS "lastName",
      COALESCE(
        array_agg(r.name ORDER BY r.name)
          FILTER (WHERE r.name IS NOT NULL),
        '{}'
      ) AS roles
    FROM users u
    LEFT JOIN user_profiles up ON up.user_id = u.id
    LEFT JOIN user_roles ur     ON ur.user_id = u.id
    LEFT JOIN roles r           ON r.id = ur.role_id
    GROUP BY u.id, up.first_name, up.last_name
    ORDER BY u.created_at DESC;
  `;

  if (users.length === 0) {
    return (
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">User &amp; role management</h2>
        <p className="mt-2 text-sm text-slate-500">
          No users found yet. Once people sign up, you can manage their roles
          here.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">User &amp; role management</h2>
        <p className="text-xs text-slate-500">
          Admins can grant or revoke roles. Changes take effect immediately.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                User
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Email
              </th>
              {roleRows.map((role) => (
                <th
                  key={role.id}
                  className="px-3 py-2 text-center font-semibold text-slate-700"
                >
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const fullName = [user.firstName, user.lastName]
                .filter(Boolean)
                .join(" ");

              return (
                <tr key={user.id} className="hover:bg-slate-50/70">
                  <td className="px-3 py-2 text-slate-800">
                    {fullName || (
                      <span className="italic text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-slate-700">{user.email}</td>

                  {roleRows.map((role) => {
                    const hasRole = user.roles.includes(role.name);
                    return (
                      <td
                        key={role.id}
                        className="px-3 py-2 text-center align-middle"
                      >
                        <form action={toggleUserRole}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input
                            type="hidden"
                            name="roleName"
                            value={role.name}
                          />
                          <input
                            type="hidden"
                            name="shouldHave"
                            value={(!hasRole).toString()}
                          />
                          <button
                            type="submit"
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                              hasRole
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                            title={
                              hasRole
                                ? `Revoke ${role.name} role`
                                : `Grant ${role.name} role`
                            }
                          >
                            {hasRole ? "✓" : "+"}
                          </button>
                        </form>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
