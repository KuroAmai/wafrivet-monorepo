import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  applyAuthCookie,
  applyRefreshCookie,
  applyRefreshCookieOnResponse,
  getAuthCookieSetOptions,
  parseRefreshCookieFromSetCookies,
  readGatewaySetCookies,
} from "@wafrivet/auth";
import { NextResponse } from "next/server";
import { extractAccessToken } from "@/lib/extractAccessToken";
import { GATEWAY_URL } from "@/lib/gateway";

export async function refreshSessionViaGateway(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is required", code: "TOKEN_INVALID" },
      { status: 401 },
    );
  }

  const gatewayRes = await fetch(`${GATEWAY_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${REFRESH_COOKIE_NAME}=${refreshToken}`,
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = (await gatewayRes.json().catch(() => ({}))) as Record<string, unknown>;

  if (!gatewayRes.ok) {
    return NextResponse.json(
      {
        message: (data.message as string | undefined) ?? "Refresh failed",
        code: data.code,
      },
      { status: gatewayRes.status },
    );
  }

  const accessToken = extractAccessToken(data);
  if (!accessToken) {
    return NextResponse.json(
      { message: "Refresh succeeded but no access token was returned" },
      { status: 502 },
    );
  }

  const maxAge =
    typeof data.expiresIn === "number"
      ? data.expiresIn
      : typeof data.expires_in === "number"
        ? data.expires_in
        : 3600;

  applyAuthCookie(cookieStore, accessToken, maxAge);

  const response = NextResponse.json({
    accessToken,
    access_token: accessToken,
    expiresIn: maxAge,
    expires_in: maxAge,
  });
  response.cookies.set(AUTH_COOKIE_NAME, accessToken, getAuthCookieSetOptions(maxAge));

  const rotatedRefresh = parseRefreshCookieFromSetCookies(readGatewaySetCookies(gatewayRes));
  if (rotatedRefresh) {
    applyRefreshCookie(cookieStore, rotatedRefresh.value, rotatedRefresh.maxAge);
    applyRefreshCookieOnResponse(response, rotatedRefresh.value, rotatedRefresh.maxAge);
  }

  return response;
}
