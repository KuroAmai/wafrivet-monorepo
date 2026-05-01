import { cookies } from "next/headers";

export type ServerAuthResult =
  | { authenticated: false }
  | { authenticated: true; role?: string; user?: unknown };

export async function getServerAuth(): Promise<ServerAuthResult> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value || cookieStore.get("token")?.value;

  if (!jwt) return { authenticated: false };

  return { authenticated: true };
}

