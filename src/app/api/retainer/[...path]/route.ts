import { NextResponse } from "next/server";
import { retainerCheckoutCookie, retainerSessionPattern } from "@/lib/retainer-session";

export const dynamic = "force-dynamic";

const actions = new Set(["checkout", "cancel", "webhook", "mark-sold"]);
const forwardedHeaders = ["stripe-signature", "authorization", "content-type"] as const;

export async function POST(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  if (path.length !== 1 || !actions.has(path[0])) {
    return NextResponse.json({ detail: "Retainer route not found." }, { status: 404 });
  }
  const backendUrl = process.env.WIELE_BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json({ detail: "Retainer service unavailable." }, { status: 503 });
  }

  const headers = new Headers();
  for (const name of forwardedHeaders) {
    const value = request.headers.get(name);
    if (value !== null) headers.set(name, value);
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${backendUrl.replace(/\/+$/, "")}/api/retainer/${path.join("/")}`, {
      method: "POST",
      headers,
      body: await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return NextResponse.json({ detail: "Retainer backend unavailable." }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type");
  const responseHeaders = new Headers({ "Cache-Control": "private, no-store" });
  if (contentType) responseHeaders.set("Content-Type", contentType);

  const checkout = path[0] === "checkout" && upstream.ok && contentType?.includes("application/json")
    ? await upstream.clone().json().catch(() => null)
    : null;
  const response = new NextResponse(upstream.body, { status: upstream.status, headers: responseHeaders });
  if (
    checkout && typeof checkout === "object" && "session_id" in checkout &&
    typeof checkout.session_id === "string" && retainerSessionPattern.test(checkout.session_id)
  ) {
    response.cookies.set(retainerCheckoutCookie, checkout.session_id, {
      httpOnly: true,
      secure: new URL(request.url).protocol === "https:",
      sameSite: "lax",
      path: "/seller/portal",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}
