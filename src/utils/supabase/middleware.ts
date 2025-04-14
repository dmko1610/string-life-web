import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];
  const isLoginPath = pathname === `/${locale}/login`;
  const isAuthPath = pathname.startsWith(`/${locale}/auth`);

  if (response.headers.get("location")) {
    return response;
  }

  if (!user && !isLoginPath && !isAuthPath) {
    const url = request.nextUrl.clone();

    url.pathname = `/${locale || "en"}/login`;
    return NextResponse.redirect(url);
  }

  return response;
}
