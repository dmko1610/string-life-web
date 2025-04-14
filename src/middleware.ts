import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
const intlMiddleware = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "en"
});

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  return await updateSession(request, response);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
