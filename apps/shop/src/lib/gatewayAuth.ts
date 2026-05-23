import { cookies } from "next/headers";
import { AUTH_COOKIE_ALIASES } from "@wafrivet/auth";
import { GATEWAY_URL } from "@/lib/gateway";

export async function getGatewayToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  for (const name of AUTH_COOKIE_ALIASES) {
    const value = cookieStore.get(name)?.value;
    if (value) return value;
  }
  return undefined;
}

export async function gatewayFetch(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<Response> {
  const token = await getGatewayToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token && token !== "mock-token") {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const { json, body, ...rest } = init;
  return fetch(`${GATEWAY_URL}${path}`, {
    ...rest,
    headers,
    body: json !== undefined ? JSON.stringify(json) : body,
  });
}
