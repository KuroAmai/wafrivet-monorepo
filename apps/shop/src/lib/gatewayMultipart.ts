import { cookies } from "next/headers";
import { AUTH_COOKIE_ALIASES } from "@wafrivet/auth";
import { GATEWAY_URL } from "@/lib/gateway";

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  for (const name of AUTH_COOKIE_ALIASES) {
    const value = cookieStore.get(name)?.value;
    if (value) return value;
  }
  return undefined;
}

export async function gatewayFetchMultipart(
  path: string,
  formData: FormData,
  init: RequestInit = {},
): Promise<Response> {
  const token = await getToken();
  const headers = new Headers(init.headers);
  if (token && token !== "mock-token") {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    method: init.method ?? "POST",
    headers,
    body: formData,
  });
}
