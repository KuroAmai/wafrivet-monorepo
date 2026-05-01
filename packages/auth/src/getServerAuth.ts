import { cookies } from "next/headers";

export type ServerAuthResult =
  | { authenticated: false }
  | { authenticated: true; role?: string; user?: unknown };

export async function getServerAuth(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value || cookieStore.get("token")?.value;

    if (!jwt) return { authenticated: false };

    // During mocking/demo, we allow the mock-token
    if (jwt === "mock-token") {
       return { 
         authenticated: true, 
         role: "farmer", 
         user: { name: "Emeka Okafor", location: "Lagos Island" } 
       };
    }

    return { authenticated: true };
  } catch (e) {
    // Build time safety
    return { authenticated: false };
  }
}

