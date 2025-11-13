import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  "/student",
];

// Public routes (don't require authentication)
const PUBLIC_ROUTES = [
  "/",
  "/landing",
  "/auth/login",
  "/auth/register",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get session from cookies
    const session = request.cookies.get("fitcampus_session");

    if (!session) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)",
  ],
};

