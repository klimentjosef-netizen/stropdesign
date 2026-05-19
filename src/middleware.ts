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

function localeFromPathname(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return defaultLocale;
}

function withLocaleHeader(response: NextResponse, locale: string): NextResponse {
  response.headers.set("x-locale", locale);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic auth pro Keystatic CMS
  if (pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic")) {
    const authResponse = checkBasicAuth(request);
    if (authResponse) {
      authResponse.headers.set("X-Robots-Tag", "noindex, nofollow");
      return authResponse;
    }
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

  const locale = localeFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (pathnameHasLocale) {
    return withLocaleHeader(
      NextResponse.next({ request: { headers: requestHeaders } }),
      locale
    );
  }

  // Honour Accept-Language only for real users, never for bots.
  const ua = request.headers.get("user-agent") || "";
  const isBot = /bot|crawl|slurp|spider|facebookexternalhit|embedly/i.test(ua);

  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLocale =
    !isBot && acceptLang.toLowerCase().startsWith("en") ? "en" : defaultLocale;

  if (preferredLocale !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return withLocaleHeader(
    NextResponse.next({ request: { headers: requestHeaders } }),
    defaultLocale
  );
}

export const config = {
  matcher: [
    "/keystatic/:path*",
    "/api/keystatic/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images).*)",
  ],
};
