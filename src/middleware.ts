// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default createMiddleware(routing);


export const config = {
  matcher: ["/", "/(my|en|ar|zh-cn)/:path*"],
};