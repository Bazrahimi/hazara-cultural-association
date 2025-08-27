// app/admin/website-queries/page.tsx
import { sql } from "@/app/lib/db";

import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Link from "next/link";
import { QuickEnquiryHead } from "./utils/definitions";

const QuickEnquiriesPage = async () => {
  const q = await sql<QuickEnquiryHead[]>`
    SELECT
      id::int AS id, 
      full_name AS "fullName",
      query_type AS "queryType",
      to_char(created_at AT TIME ZONE 'Australia/Melbourne', 'DD Mon YY') AS "received",
      seen
    FROM public.quick_enquiries
    ORDER BY created_at DESC
  `;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Header as="h3" size="sm">
        Quick Enquiries
      </Header>

      {q.length === 0 ? (
        <P className="text-center text-2xl">No quick enquiries found.</P>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Received</th>

                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {q.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className={`border-b hover:bg-gray-50 ${
                    !enquiry.seen ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/website-queries/${enquiry.id}`}
                      className="inline-flex items-center gap-2 text-blue-800 hover:underline"
                    >
                      {!enquiry.seen && (
                        <span
                          className="inline-block h-2 w-2 rounded-full bg-blue-600"
                          aria-label="unread"
                          title="unread"
                        />
                      )}
                      <span>{enquiry.fullName}</span>
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-700">
                      {enquiry.queryType}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {enquiry.received}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/website-queries/${enquiry.id}`}
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      View & mark seen
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuickEnquiriesPage;
