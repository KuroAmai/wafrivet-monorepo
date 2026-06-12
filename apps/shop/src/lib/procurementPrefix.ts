import { gatewayFetch } from "@/lib/gatewayAuth";

export type ProcurementPrefix = "/vet" | "/shopper";

type AuthMeRoles = {
  roles?: string[];
  role?: string;
};

export async function resolveProcurementPrefix(): Promise<ProcurementPrefix | null> {
  const res = await gatewayFetch("/auth/me");
  if (!res.ok) return null;

  const data = (await res.json().catch(() => ({}))) as AuthMeRoles;
  const roles = new Set<string>();
  for (const role of data.roles ?? []) {
    roles.add(role.toUpperCase());
  }
  if (data.role) {
    roles.add(data.role.toUpperCase());
  }

  if (roles.has("VET")) return "/vet";
  if (roles.has("REGULAR_CUSTOMER") || roles.has("FARMER")) return "/shopper";
  return null;
}
