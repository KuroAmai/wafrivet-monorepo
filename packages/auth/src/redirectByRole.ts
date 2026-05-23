import { getShopBaseUrl, getShopEntryUrl } from "./shopAuth";

export type UserRole =
  | "farmer"
  | "vet"
  | "chemist"
  | "distributor"
  | "customer"
  | "admin";

export function redirectByRole(role: UserRole): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";
  const herdUrl = process.env.NEXT_PUBLIC_HERD_URL || "https://herd.wafrivet.com";

  switch (role) {
    case "farmer":
    case "vet":
      return herdUrl;
    case "chemist":
    case "distributor":
      return getShopEntryUrl(role);
    case "customer":
      return getShopBaseUrl();
    case "admin":
      return `${appUrl}/admin`;
    default:
      return `${appUrl}/dashboard`;
  }
}
