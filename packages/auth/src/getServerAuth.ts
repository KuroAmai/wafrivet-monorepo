import { cookies } from "next/headers";
import { decodeJwtPayload } from "./decodeJwt";

export type ServerAuthResult =
  | { authenticated: false }
  | {
      authenticated: true;
      role?: string;
      user?: { id?: string; email?: string; name?: string; role?: string };
    };

const MOCK_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true" ||
  process.env.NODE_ENV === "development";

export async function getServerAuth(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    const jwt =
      cookieStore.get("jwt")?.value ||
      cookieStore.get("access_token")?.value ||
      cookieStore.get("token")?.value;

    if (!jwt) return { authenticated: false };

    if (MOCK_ENABLED && jwt === "mock-token") {
      return {
        authenticated: true,
        role: "ADMIN",
        user: { name: "Emeka Okafor", email: "demo@wafrivet.com", role: "ADMIN" },
      };
    }

    const payload = decodeJwtPayload(jwt);
    if (!payload?.sub) {
      return { authenticated: true, role: payload?.role };
    }

    return {
      authenticated: true,
      role: payload.role ?? payload.roles?.[0],
      user: {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      },
    };
  } catch {
    return { authenticated: false };
  }
}
