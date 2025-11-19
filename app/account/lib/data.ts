// import { sql } from "@/app/lib/db";
// import { FullName } from "./definitions";

// export const getUserGreetingName = async (userId: number) => {
//   const names = await sql<FullName[]>`
//     SELECT
//       first_name AS "firstName",
//       last_name AS "lastName"

//     FROM 
//       user_profiles
//     WHERE
//       user_id = ${userId}
//     LIMIT 1;
//   `;

//   const firstName = names[0]?.firstName?.trim() ?? "";
//   const lastName = names[0]?.lastName?.trim() ?? "";

//   const fullName = [firstName, lastName].filter(Boolean).join(" ");

//   const greetingName = fullName.length > 0 ? fullName : "there";

//   return { fullName: fullName || null, greetingName };
// };
