import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized({ req, token }) {
      return !!token;
    },
  },
});

export const config = { matcher: ["/ariinuruu/panel/:path*"] };
