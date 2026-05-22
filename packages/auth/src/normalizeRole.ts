import type { UserRole } from "./redirectByRole";

/** Maps JWT / API role strings to app signup roles. */
export function normalizeUserRole(role?: string | null): UserRole | null {
  if (!role) return null;
  const key = role.toLowerCase();
  const map: Record<string, UserRole> = {
    farmer: "farmer",
    vet: "vet",
    veterinarian: "vet",
    chemist: "chemist",
    pharmacist: "chemist",
    supplier: "chemist",
    distributor: "distributor",
    rider: "distributor",
    admin: "admin",
  };
  return map[key] ?? null;
}
