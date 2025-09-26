// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

// export const middleware = async (req: NextRequest) => {
//   const { pathname } = req.nextUrl;

//   // only protect /admin
//   if (!pathname.startsWith("/admin")) return NextResponse.next();

//   const cookie = req.cookies.get("session")?.value;
//   const session = cookie ? await decrypt(cookie) : null;

//   if (!session?.roles.includes("admin")) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/u/login";
//     url.searchParams.set("next", pathname);
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/admin/:path*"],
// };

// test mode
/** Helper: add noindex headers to any response */
function disallowCrawlers(res: NextResponse) {
  res.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex"
  );
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) Allow any auth/account routes under /u/* without requiring a session
  //    (login, sign-up, forgot-password, etc), but still block crawlers.
  if (pathname.startsWith("/u/") || pathname === "/about-us") {
    return disallowCrawlers(NextResponse.next());
  }

  // Require login for everything else
  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/u/login";
    url.searchParams.set("next", pathname + (search || ""));
    return disallowCrawlers(NextResponse.redirect(url));
  }

  // Authenticated: proceed, still block crawlers
  return disallowCrawlers(NextResponse.next());
}

/** Apply to (almost) everything, skip Next internals & common public assets */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|images|public).*)",
  ],
};
