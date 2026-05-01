export type UserRole = "farmer" | "vet" | "chemist" | "distributor" | "admin";

export function redirectByRole(role: UserRole): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";
  const herdUrl = process.env.NEXT_PUBLIC_HERD_URL || "https://herd.wafrivet.com";
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";

  switch (role) {
    case "farmer":
    case "vet":
      return herdUrl;
    case "chemist":
      return `${shopUrl}/dashboard`;
    case "distributor":
      return `${shopUrl}/distributor`;
    case "admin":
      return `${appUrl}/admin`;
    default:
      return `${appUrl}/dashboard`;
  }
}
