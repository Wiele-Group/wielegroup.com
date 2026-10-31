import { NextResponse, type NextRequest } from "next/server";
import { isRetiredAgencyPath, retiredAgencyResponse } from "@/lib/retired-agency";

export function proxy(request: NextRequest) {
  if (isRetiredAgencyPath(request.nextUrl.pathname)) return retiredAgencyResponse(request.method);
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api/|_next/|property/|property-identity/|favicon.ico).*)"] };
