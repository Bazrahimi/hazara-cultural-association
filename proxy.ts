// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { AdminRoutes, AuthRoutes } from "./app/lib/routes";
import { decrypt } from "./app/lib/session/session";

export const proxy = async (req: NextRequest) => {
  const { pathname, search } = req.nextUrl;

  // only protect /admin
  if (!pathname.startsWith(AdminRoutes.root())) return NextResponse.next();

  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (!session?.roles.includes("admin")) {
    const url = req.nextUrl.clone();
    url.pathname = AuthRoutes.login();
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};

// test mode
/** Helper: add noindex headers to any response */
function disallowCrawlers(res: NextResponse) {
  res.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex"
  );
  return res;
}
