//app/admin/enquiry/quick-enquiries

import { sql } from "@/app/lib/db";

const QuickEnquiriesPage = async () => {
  const quickEnquiries = await sql<
    {
      id: string;
      fullName: string;
      queryType: string;
      created_at: string;
      seen: boolean;
    }[]
  >`
    SELECT
      id::int                           AS id, 
      full_name                         AS "fullName",
      query_type                        AS "queryType",
      to_char(created_at, 'DD Mon YY')
      seen
    FROM quick_enquiries
    ORDER BY created_at DESC
    `;

  console.log(quickEnquiries);

  return (
    <div></div>
    // <div className="mx-auto max-w-6xl px-4 py-8">
    //   <h1 className="mb-6 text-2xl font-bold text-yellow-700">
    //     Quick Enquiries
    //   </h1>

    //   {contactSubmissions.length === 0 ? (
    //     <p className="text-gray-500">No quick Enquiries found.</p>
    //   ) : (
    //     <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
    //       <table className="min-w-full text-left text-sm">
    //         <thead className="border-b bg-gray-100 text-xs tracking-wider text-gray-600 uppercase">
    //           <tr>
    //             <th className="px-4 py-3">Full Name</th>
    //             <th className="px-4 py-3">Subject</th>
    //             <th className="px-4 py-3">Received</th>
    //             <th className="px-4 py-3 text-right">Actions</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {contactSubmissions.map((enquiry: QuickEnquiryHead) => (
    //             <tr
    //               key={enquiry.id}
    //               className={`border-b hover:bg-gray-50 ${
    //                 !enquiry.seen ? "bg-blue-50 font-semibold" : ""
    //               }`}
    //             >
    //               <td className="px-4 py-3 text-blue-800 hover:underline">
    //                 <Link href={`/admin/enquiry/quick-enquiries/${enquiry.id}`}>
    //                   {enquiry.fullName}
    //                 </Link>
    //               </td>

    //               <td className="px-4 py-3 text-gray-700 hover:underline">
    //                 <Link href={`/admin/enquiry/quick-enquiries/${enquiry.id}`}>
    //                   {getServiceCategoryName(enquiry.serviceCategory)}
    //                 </Link>
    //               </td>

    //               <td className="px-4 py-3 text-gray-600 hover:underline">
    //                 <Link href={`/admin/enquiry/quick-enquiries/${enquiry.id}`}>
    //                   {formateAussieDateTime(enquiry.createdAt)}
    //                 </Link>
    //               </td>

    //               <td className="px-4 py-3 text-right">
    //                 <DeleteContactForm id={enquiry.id} />
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   )}
    // </div>
  );
};

export default QuickEnquiriesPage;
