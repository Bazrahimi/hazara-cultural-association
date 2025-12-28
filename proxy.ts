// proxy.ts
import { isProtectedPath } from "./app/lib/session/protectedRoutes";
import { NextRequest, NextResponse } from "next/server";
import { AuthRoutes } from "./app/lib/routes";
import { SESSION_COOKIE } from "./app/lib/session/sessionConfig";

export const proxy = async (req: NextRequest) => {
  const { pathname, search } = req.nextUrl;

  if (!isProtectedPath(pathname)) return NextResponse.next();

  const hasSession = req.cookies.get(SESSION_COOKIE)?.value;

  if (!hasSession) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = AuthRoutes.login();
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/blog/auth:path*"],
};

// test mode
/** Helper: add noindex headers to any response */
// function disallowCrawlers(res: NextResponse) {
//   res.headers.set(
//     "X-Robots-Tag",
//     "noindex, nofollow, noarchive, nosnippet, noimageindex"
//   );
//   return res;
// }
