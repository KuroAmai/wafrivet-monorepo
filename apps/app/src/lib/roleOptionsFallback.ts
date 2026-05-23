import type { PlatformSelectableRole, RegionDto, RoleOptionDto } from "@wafrivet/types";

export const FALLBACK_ROLE_OPTIONS: RoleOptionDto[] = [
  {
    id: "FARMER",
    name: "farmer",
    label: "Farmer",
    description: "Manage your herd, track vitals, and order medicine.",
    requires_kyc: false,
  },
  {
    id: "REGULAR_CUSTOMER",
    name: "regular_customer",
    label: "Shop customer",
    description: "Browse and order medicine without managing a herd.",
    requires_kyc: false,
  },
  {
    id: "VET",
    name: "vet",
    label: "Veterinarian",
    description: "Diagnose animals and manage patient records.",
    requires_kyc: true,
  },
  {
    id: "SUPPLIER",
    name: "supplier",
    label: "Chemist / Supplier",
    description: "Sell medicine and manage your inventory.",
    requires_kyc: true,
  },
  {
    id: "MANUFACTURER",
    name: "manufacturer",
    label: "Distributor",
    description: "Manage your chemist network and supply chain.",
    requires_kyc: true,
  },
];

export const FALLBACK_REGIONS: RegionDto[] = [
  { id: "00000000-0000-4000-8000-000000000001", name: "Lagos" },
  { id: "00000000-0000-4000-8000-000000000002", name: "Abuja" },
  { id: "00000000-0000-4000-8000-000000000003", name: "Kano" },
];

export function isKycPlatformRole(
  role: PlatformSelectableRole,
): role is "VET" | "SUPPLIER" | "MANUFACTURER" {
  return role === "VET" || role === "SUPPLIER" || role === "MANUFACTURER";
}
