import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (req.nextUrl.pathname.startsWith("/dashboard") && req.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/drafts" || "/post-preview") &&
      req.nextauth.token?.role !== "moderator" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/profile") && !req.nextauth.token) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/drafts",
    "/profile",
    "/profile/edit",
    "/profile/edit/name",
    "/profile/edit/email",
    "/profile/edit/password",
    "/dashboard",
    "/post-preview",
  ],
};
