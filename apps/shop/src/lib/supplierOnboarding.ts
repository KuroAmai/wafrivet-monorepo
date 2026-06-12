export const SUPPLIER_ONBOARDING_URL = `${
  process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com"
}/onboarding?changeRole=1&role=SUPPLIER`;

export function isSupplierProfileMissingError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error ?? "");
  return msg.toLowerCase().includes("supplier profile not found");
}
