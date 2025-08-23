"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Session, SessionPayload } from "./definitions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7day")
    .sign(encodedKey);
};

export const createSession = async (userId: string, isAdmin: boolean) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const sessionPayload: SessionPayload = { userId, expiresAt };
  if (isAdmin) {
    sessionPayload.isAdmin = true;
  }

  const session = await encrypt(sessionPayload);
  const cookieStore = await cookies();

  // Set the session cookie with security options
  cookieStore.set("session", session, {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    secure: true, // Send cookie only over HTTPS
    expires: expiresAt, // Expiry date for the session
    sameSite: "lax", // Restrict cross-site cookie usage (safe default)
    path: "/", // Make the cookie accessible site-wide
  });
};

export async function decrypt(
  session: string | undefined = ""
): Promise<Session | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}
