import type { ShopperAddressDto } from "@wafrivet/types";

export function formatShopperAddressLine(addr: ShopperAddressDto): string {
  const parts = [addr.fullAddress, addr.city, addr.state, addr.postalCode, addr.country].filter(
    Boolean,
  );
  return parts.join(", ");
}

export function pickDefaultShopperAddress(
  addresses: ShopperAddressDto[] | undefined,
): ShopperAddressDto | undefined {
  if (!addresses?.length) return undefined;
  return addresses.find((a) => a.isDefault) ?? addresses[0];
}
