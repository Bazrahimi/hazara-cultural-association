// app/lib/protectedRoutes.ts

// ✅ SINGLE SOURCE OF TRUTH (static literals)
export const PROTECTED_ROUTE_PREFIXES = ["/admin", "/blog/auth"] as const;

/**
 * Utility: check if a pathname is protected
 */
export const isProtectedPath = (pathname: string): boolean => {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
};
