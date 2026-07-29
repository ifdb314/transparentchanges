import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Note: this file is named `proxy.ts`, not `middleware.ts` — Next.js 16 renamed
// the middleware file convention to "Proxy." Same behavior, new file name.

export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    // Fail closed: if credentials aren't configured, don't expose the dashboard.
    return new NextResponse("Admin dashboard is not configured yet.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const separatorIndex = decoded.indexOf(":");
      const suppliedUser = decoded.slice(0, separatorIndex);
      const suppliedPassword = decoded.slice(separatorIndex + 1);
      if (suppliedUser === user && suppliedPassword === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="TransparentChanges Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
