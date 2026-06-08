import { NextResponse } from "next/server";

const ALLOWED_ORIGIN_SUFFIXES = [".wafrivet.com", "wafrivet.com", "localhost", "127.0.0.1"];

function isAllowedAuthBffOrigin(origin: string | null): origin is string {
  if (!origin) return false;
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:" && protocol !== "http:") return false;
    if (protocol === "http:" && !["localhost", "127.0.0.1"].includes(hostname)) {
      return false;
    }
    const host = hostname.toLowerCase();
    return ALLOWED_ORIGIN_SUFFIXES.some(
      (suffix) => host === suffix || host.endsWith(suffix.startsWith(".") ? suffix : `.${suffix}`),
    );
  } catch {
    return false;
  }
}

export function applyAuthBffCors(request: Request, response: NextResponse): NextResponse {
  const origin = request.headers.get("origin");
  if (isAllowedAuthBffOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Vary", "Origin");
  }
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export function authBffPreflightResponse(request: Request): NextResponse {
  return applyAuthBffCors(request, new NextResponse(null, { status: 204 }));
}
