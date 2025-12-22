// app/u/oauth/google/callback/route.ts
import { sql } from "@/app/lib/db";
import { AccountRoutes, AuthRoutes } from "@/app/lib/routes";
import { createSession } from "@/app/lib/session";
import { buildFullName } from "@/app/u/auth/lib/helper"; // you already have this
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const error = searchParams.get("error");

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oauth_state_google")?.value;

  // 1) Handle error/cancel
  if (error) {
    console.error("Google OAuth error:", error);

    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_cancelled`
    );
  }

  // 2) Ensure code + state are present
  if (!code || !returnedState || !savedState || savedState !== returnedState) {
    console.error("Google OAuth state mismatch or missing code");
    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_invalid_state`
    );
  }

  // Clear the state cookie
  cookieStore.set("oauth_state_google", "", {
    path: AuthRoutes.root(),
    maxAge: 0,
  });

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}${AuthRoutes.googleOAuthCallback()}`;

  // 3) Exchange code -> tokens
  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    console.error("Failed to exchange code for token", await tokenRes.text());
    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_token`
    );
  }

  const tokenJson = (await tokenRes.json()) as {
    access_token: string;
    id_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
  };

  const accessToken = tokenJson.access_token;
  if (!accessToken) {
    console.error("No access token from Google");
    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_no_token`
    );
  }

  // 4) Fetch user info from Google
  const userInfoRes = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userInfoRes.ok) {
    console.error("Failed to fetch Google user info", await userInfoRes.text());
    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_userinfo`
    );
  }

  const userInfo = (await userInfoRes.json()) as {
    sub: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  };

  const provider = "google";
  const providerUserId = userInfo.sub;
  const email = userInfo.email ?? "";
  const emailVerified = Boolean(userInfo.email_verified);

  if (!providerUserId || !email) {
    console.error("Google user info missing sub or email", userInfo);
    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_incomplete_profile`
    );
  }

  // 5) Find or create a local user
  let userId: number | null = null;

  // 5a) First, see if we already have this provider link
  const providerRows = await sql<{ user_id: number }[]>`
    SELECT user_id
    FROM user_providers
    WHERE provider = ${provider} AND provider_user_id = ${providerUserId}
    LIMIT 1;
  `;

  if (providerRows.length > 0) {
    userId = providerRows[0].user_id;
  } else {
    // 5b) See if a user already exists with this email
    const existingUserRows = await sql<{ id: number }[]>`
      SELECT id
      FROM users
      WHERE lower(email) = lower(${email})
      LIMIT 1;
    `;

    if (existingUserRows.length > 0) {
      userId = existingUserRows[0].id;
    } else {
      // 5c) Create a new user for Google OAuth
      // Generate a random password and hash it, just to satisfy NOT NULL.
      // The user will normally log in via Google, and can later change
      // their password in /account/settings/change-password.
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const passwordHash = await bcrypt.hash(randomPassword, 12);

      const insertUserRows = await sql<{ id: number }[]>`
        INSERT INTO users (email, password, email_verified_at)
        VALUES (
          ${email},
          ${passwordHash},
          ${emailVerified ? new Date().toISOString() : null}
        )
        RETURNING id;
      `;

      userId = insertUserRows[0].id;

      // (Optional) Insert profile name
      if (userInfo.name) {
        await sql`
          INSERT INTO user_profiles (user_id, first_name, last_name)
          VALUES (
            ${userId},
            ${userInfo.given_name ?? userInfo.name},
            ${userInfo.family_name ?? ""}
          )
          ON CONFLICT (user_id) DO NOTHING;
        `;
      }
    }

    // 5d) Link provider → user
    await sql`
      INSERT INTO user_providers (user_id, provider, provider_user_id, provider_email)
      VALUES (${userId}, ${provider}, ${providerUserId}, ${email})
      ON CONFLICT (provider, provider_user_id) DO NOTHING;
    `;
  }

  if (!userId) {
    console.error("Could not resolve or create user for Google OAuth");
    return NextResponse.redirect(
      `${AuthRoutes.login()}?error=google_oauth_user_creation`
    );
  }

  // 6) Load roles for session (optional, matches your existing pattern)
  const userRows = await sql<
    {
      userId: number;
      roles: string[];
      fullName: string | null;
    }[]
  >`
    SELECT
      u.id AS "userId",
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
    LEFT JOIN user_profiles up ON up.user_id = u.id
    LEFT JOIN user_roles ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    WHERE u.id = ${userId}
    GROUP BY u.id, up.first_name, up.last_name
    LIMIT 1;
  `;

  const user = userRows[0];

  const fullName = buildFullName(user?.fullName ?? "", email);

  // Ensure we always have at least a "basic" role for session payload.
  const dbRoles = (user?.roles ?? []) as string[];
  const effectiveRoles = dbRoles.length > 0 ? dbRoles : ["basic"];

  // 7) Create session with your existing logic
  await createSession(userId, effectiveRoles, { fullName });

  // 8) Redirect to account dashboard (must be an absolute URL)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;
  const redirectUrl = new URL(AccountRoutes.root(), baseUrl);

  return NextResponse.redirect(redirectUrl);
}
