import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Determine if we are on a secure (HTTPS) environment like Vercel
  const isSecure = process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:";

  // Explicitly tell getToken which cookie name to look for
  const cookieName = isSecure ? "__Secure-authjs.session-token" : "authjs.session-token";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: isSecure,
    salt: cookieName
  });

  const { pathname } = request.nextUrl;

  console.log("Middleware token:", token ? "Found" : "Null");
  console.log("Middleware pathname:", pathname);

  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
    console.log("Redirecting to dashboard from middleware");
    return NextResponse.redirect(new URL("/deshboard", request.url));
  }
  if (!token && (pathname.startsWith("/deshboard") || pathname.startsWith("/landing"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/dashboard/:path*',
    '/landing/:path*'
  ],
};