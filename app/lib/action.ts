"use server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  sendAdminEmail,
  sendUserConfirmationEmail,
} from "../ui/global/resend/email";
import { sql } from "./db";
import { AuthState, QuickEnquiryState } from "./definitions";
import { AuthSchema, QuickEnquirySchema } from "./schema";
import { createSession } from "./session";

export const submitEnquiry = async (
  prevState: QuickEnquiryState | undefined,
  formData: FormData
) => {
  const rawData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,
    queryType: formData.get("queryType"),
    qMessage: formData.get("qMessage") as string,
    queryLabel: formData.get('queryTypeLabel') as string
  };



  const validated = QuickEnquirySchema.safeParse({
    fullName: rawData.fullName,
    email: rawData.email,
    contactNumber: rawData.contactNumber,
    queryType: rawData.queryType,
    qMessage: rawData.qMessage,
  });

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    return {
      ...rawData,
      ok: false,
      message: "Complete the above field!",
      errors: {
        fullName: tree.properties?.fullName?.errors,
        email: tree.properties?.email?.errors,
        contactNumber: tree.properties?.contactNumber?.errors,
        queryType: tree.properties?.queryType?.errors,
        qMessage: tree.properties?.qMessage?.errors,
      },
    };
  }

  const data = validated.data;

 
  try {
     await sql<[{ id: number }]>`
      INSERT INTO quick_enquiries (full_name, email, contact_number, query_type, message)
      VALUES (${data.fullName}, ${data.email}, ${data.contactNumber || null}, ${data.queryType}, ${data.qMessage})
      RETURNING id
    `;

  } catch (err) {
    console.error("Failed to submit the enquiry:", err);
    return {
      ...rawData,
      ok: false,
      message: "Failed to submit the enquiry. Please try again later.",
      errors: undefined,
    };
  }

  // 2) Send admin + user emails in parallel (non-critical)
  const adminEmailPromise = sendAdminEmail({ ...data }, rawData.queryLabel);
  const userEmailPromise = sendUserConfirmationEmail({ ...data }, rawData.queryLabel);

  const [adminRes, userRes] = await Promise.allSettled([
    adminEmailPromise,
    userEmailPromise,
  ]);

  if (adminRes.status === "rejected") {
    console.error("Admin email send failed:", adminRes.reason);
  }
  if (userRes.status === "rejected") {
    console.error("User confirmation email failed:", userRes.reason);
  }

  let message = "Thanks! We have received your enquiry.";
  if (userRes.status === "rejected") {
    message += " (Heads-up: we couldn’t send the confirmation email.)";
  }

  return {
    fullName: "",
    email: "",
    contactNumber: "",
    queryType: "",
    qMessage: "",
    ok: true,
    message,
    errors: undefined,
    // id: insertedId, // expose if you want
  };
};

export const auth = async (
  prevState: AuthState | undefined,
  formData: FormData
) => {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;

  const validated = AuthSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  // if form field invalid, return early
  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    // Map to your expected fieldErrors shape

    return {
      email: rawEmail,
      password: rawPassword,
      errors: {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      },
    };
  }

  // if form field invalid, return early
  // if (!validated.success) {
  //   return {
  //     email: rawEmail,
  //     password: rawPassword,
  //     errors: validated.error.flatten().fieldErrors,
  //   };
  // }

  const { email, password } = validated.data;

  try {
    const result = await sql<
      { userId: number; hashedPassword: string; isAdmin: boolean }[]
    >`
      SELECT 
        id AS "userId", 
        password AS "hashedPassword", 
        is_admin AS "isAdmin" 
      FROM users 
      WHERE email = ${email}
    `;
    const user = result[0];

    if (!user)
      return {
        email,
        password,
        message: "No account found with the provided email address.",
      };

    const matched = await bcrypt.compare(password, user.hashedPassword);

    if (!matched)
      return {
        email,
        password,
        message: "Incorrect password. Please try again.",
      };
    if (user.isAdmin) {
      await createSession(String(user.userId), user.isAdmin);
    }
  } catch (error) {
    console.error("Failed to login", error);
    return {
      email,
      password,
      message:
        "An error occurred while processing your request. Please try again.",
    };
  }
  redirect("/admin");
};
