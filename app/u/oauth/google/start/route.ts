// app/u/oauth/google/start/route.ts

import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const GET = async () => {
  const cookieStore = await cookies();

  // Random state for CSRF protection
  const state = crypto.randomBytes(16).toString("hex");

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/u/oauth/google/callback`;

  // Save state in a secure cookie so we can verify it on callback
  cookieStore.set("oauth_state_google", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/u",
    maxAge: 10 * 60, // 10 minutes
  });

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri,
    // 🔴 THIS WAS MISSING
    response_type: "code",
    // 🔴 scopes (what info we want)
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "consent",
  });

  const url = `${GOOGLE_AUTH_URL}?${params.toString()}`;
  return NextResponse.redirect(url);
};
