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
    queryLabel: formData.get("queryTypeLabel") as string,
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
  const userEmailPromise = sendUserConfirmationEmail(
    { ...data },
    rawData.queryLabel
  );

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
  _prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState | never> => {
  const rawEmail = String(formData.get("email") ?? "");
  const rawPassword = String(formData.get("password") ?? "");

  const parsed = AuthSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors above.",
      data: { email: rawEmail }, // never return password
      errors: fe as AuthState["errors"], // compatible shape
    };
  }

  const { email, password } = parsed.data;

  try {
    // citext makes this case-insensitive, so direct compare is fine
    const result = await sql<
      {
        userId: number;
        hashedPassword: string;
        roles: string[];
        fullName: string | null;
      }[]
    >`
        SELECT
          u.id AS "userId",
          u.password AS "hashedPassword",
          COALESCE(
            up.first_name || ' ' || up.last_name,
            ''  
          ) AS "fullName",
          COALESCE(
            array_agg(r.name ORDER BY r.name)
          FILTER (WHERE r.name IS NOT NULL), 
          '{}'
          ) AS roles
        FROM users u
        LEFT JOIN user_profiles up  ON up.user_id = u.id
        LEFT JOIN user_roles ur     ON ur.user_id = u.id
        LEFT JOIN roles r           ON r.id = ur.role_id
        WHERE u.email = ${email}
        GROUP BY u.id, up.first_name, up.last_name
        LIMIT 1
    `;
    const user = result[0];

    if (!user) {
      return {
        ok: false,
        message: "No account found with the provided email address.",
        data: { email },
      };
    }

    const matched = await bcrypt.compare(password, user.hashedPassword);
    if (!matched) {
      return {
        ok: false,
        message: "Incorrect password. Please try again.",
        data: { email },
      };
    }

    // Build a safe greeting/name value
    const fullName =
      user.fullName && user.fullName.trim().length > 0
        ? user.fullName.trim()
        : email.split("@")[0]; // fallback to email local-part

    // ✅ Create a session for both admin and non-admin users
    await createSession(Number(user.userId), user.roles, {fullName});

    // Hand control to Next.js to redirect
    redirect("/account");
  } catch (error) {
    console.error("Failed to login", error);
    return {
      ok: false,
      message:
        "An error occurred while processing your request. Please try again.",
      data: { email },
    };
  }
};
