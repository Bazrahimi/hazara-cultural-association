// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // only protect /admin
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (!session?.isAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
