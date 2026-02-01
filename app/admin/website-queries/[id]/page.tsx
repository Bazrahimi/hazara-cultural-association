import { sql } from "@/app/_lib/db";
import { AdminRoutes } from "@/app/_lib/routes";
import { DeleteFormAction, Header, P } from "@/app/_ui";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { QUERY_OPTIONS } from "../page";
import { QuickEnquiryRecord } from "../utils/definitions";

// --- Server Action (delete) ---
const deleteEnquiryAction = async (formData: FormData) => {
  "use server";
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;

  await sql`DELETE FROM public.quick_enquiries WHERE id = ${id}`;
  revalidatePath(AdminRoutes.websiteQueries());
  redirect(AdminRoutes.websiteQueries());
};
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const idStr = (await params).id;
  const id = parseInt(idStr); // convert to number
  if (isNaN(id)) return notFound();

  const [enquiry] = await sql<QuickEnquiryRecord[]>`
    UPDATE public.quick_enquiries
    SET seen = true
    WHERE id = ${id}
    RETURNING
      id::int                             AS id,
      full_name                           AS "fullName",
      email,
      contact_number                      AS "contactNumber",
      query_type                          AS "queryType",
      message,
      to_char(created_at, 'DD Mon YY')    AS "received",
      seen

  `;

  if (!enquiry) return notFound();
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex justify-between gap-3 mb-3">
        <Header as="h3" size="sm">
          Quick Enquiry #{enquiry.id}
        </Header>
        <DeleteFormAction
          id={enquiry.id}
          variant="outline"
          action={deleteEnquiryAction}
        >
          X
        </DeleteFormAction>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Received</dt>
            <dd className="text-base text-gray-900">{enquiry.received}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Seen</dt>
            <dd className="text-base text-gray-900">
              {enquiry.seen ? "Yes" : "No"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Name</dt>
            <dd className="text-base text-gray-900">{enquiry.fullName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Query Type</dt>
            <dd className="text-base text-gray-900">
              {QUERY_OPTIONS[enquiry.queryType]}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="text-base text-gray-900">{enquiry.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd className="text-base text-gray-900">
              {enquiry.contactNumber ?? "—"}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <dt>
            {" "}
            <P className="text-sm text-gray-500"> Message</P>
          </dt>
          <dd className="mt-1 whitespace-pre-wrap rounded bg-gray-50 p-3 text-gray-900">
            {enquiry.message}
          </dd>
        </div>
      </div>
    </main>
  );
};

export default page;
