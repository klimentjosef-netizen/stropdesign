import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

function checkBasicAuth(request: NextRequest): NextResponse | null {
  const auth = request.headers.get("authorization");
  if (auth) {
    const [, encoded] = auth.split(" ");
    const decoded = atob(encoded || "");
    const [user, pass] = decoded.split(":");
    if (user === process.env.CMS_USER && pass === process.env.CMS_PASS) {
      return null;
    }
  }
  return new NextResponse("Přístup odepřen", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="CMS"' },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic auth pro Keystatic CMS
  if (pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic")) {
    const authResponse = checkBasicAuth(request);
    if (authResponse) return authResponse;
    return NextResponse.next();
  }

  // Skip API routes, static files, and _next
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For the default locale (cs), don't redirect — serve directly
  // For non-default locale detection, check Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLang.includes("en") ? "en" : defaultLocale;

  // Only redirect if the preferred locale is NOT the default
  if (preferredLocale !== defaultLocale) {
    // Set a cookie so we know the user's preference
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/keystatic/:path*",
    "/api/keystatic/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
