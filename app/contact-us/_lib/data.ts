import { sql } from "@/app/_lib/db";
import { Enquiry } from "./definitions";

export const insertEnquiry = async (data: Enquiry): Promise<number | null> => {
  const rows = await sql<{ id: number }[]>`
    INSERT INTO quick_enquiries 
     (full_name, email, contact_number, query_type, message)
    VALUES (
      ${data.fullName}, 
      ${data.email}, 
      ${data.contactNumber || null}, 
      ${data.queryType}, 
      ${data.qMessage})
    RETURNING id
  `;

  const id = rows[0]?.id;
  if (!id) {
    throw new Error("Failed to insert enquiry");
  }

  return id;
};
