import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token && pathname !== "/login") {
    return Response.redirect(new URL("/login", req.url));
  }

  // Example RBAC enforcement
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }

  return Response.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};