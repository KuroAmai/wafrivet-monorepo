import { cookies } from "next/headers";
import { decodeJwtPayload } from "./decodeJwt";
import { extractRolesFromJwt, resolvePrimaryRole } from "./adminRole";

export type ServerAuthResult =
  | { authenticated: false }
  | {
      authenticated: true;
      role?: string;
      roles?: string[];
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
        roles: ["ADMIN"],
        user: { name: "Emeka Okafor", email: "demo@wafrivet.com", role: "ADMIN" },
      };
    }

    const payload = decodeJwtPayload(jwt);
    if (!payload) {
      return { authenticated: false };
    }

    const roles = extractRolesFromJwt(payload);
    const role = resolvePrimaryRole(roles);

    if (!payload.sub) {
      return { authenticated: true, role, roles };
    }

    return {
      authenticated: true,
      role,
      roles,
      user: {
        id: payload.sub,
        email: payload.email,
        role,
      },
    };
  } catch {
    return { authenticated: false };
  }
}
