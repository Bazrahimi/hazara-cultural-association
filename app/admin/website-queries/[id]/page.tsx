import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { QuickEnquiryStateRecord } from "../utils/definitions";
import NewEnquiry from "../ui/NewEnquiry";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const idStr = (await params).id;
  const id = parseInt(idStr); // convert to number
  if (isNaN(id)) return notFound();

  const [enquiry] = await sql<QuickEnquiryStateRecord[]>`
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
      <h1 className="mb-4 text-2xl font-semibold">Quick Enquiry #{enquiry.id}</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Received</dt>
            <dd className="text-base text-gray-900">{enquiry.received}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Seen</dt>
            <dd className="text-base text-gray-900">{enquiry.seen ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Name</dt>
            <dd className="text-base text-gray-900">{enquiry.fullName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Query Type</dt>
            <dd className="text-base text-gray-900">{enquiry.queryType}</dd>
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
          <dt className="text-sm text-gray-500">Message</dt>
          <dd className="mt-1 whitespace-pre-wrap rounded bg-gray-50 p-3 text-gray-900">
            {enquiry.message}
          </dd>
        </div>
      </div>

      {/* Optional: inline preview of the React Email (handy for dev) */}
      <section className="mt-10">
        <h2 className="mb-2 text-lg font-medium">Email Preview</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <NewEnquiry
            fullName={enquiry.fullName}
            email={enquiry.email}
            contactNumber={enquiry.contactNumber ?? ""}
            // map DB `message` -> email prop `qMessage`
            qMessage={enquiry.message}
          />
        </div>
      </section>
    </main>
  );
};

export default page;
