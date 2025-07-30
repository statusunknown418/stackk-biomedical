import type { MiddlewareConfig, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;

  reqHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });
}

export const config: MiddlewareConfig = {};
