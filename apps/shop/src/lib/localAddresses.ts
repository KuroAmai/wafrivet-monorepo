export type LocalAddress = {
  id: string;
  type: string;
  address: string;
  city: string;
  isDefault: boolean;
};

const addressesKey = (userId: string) => `wafrivet_shop_addresses_${userId}`;

export function readLocalAddresses(userId: string): LocalAddress[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(addressesKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LocalAddress[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalAddresses(userId: string, addresses: LocalAddress[]): void {
  localStorage.setItem(addressesKey(userId), JSON.stringify(addresses));
}

export function upsertLocalAddress(userId: string, address: LocalAddress): LocalAddress[] {
  let list = readLocalAddresses(userId);
  const idx = list.findIndex((a) => a.id === address.id);
  if (address.isDefault) {
    list = list.map((a) => ({ ...a, isDefault: false }));
  }
  if (idx >= 0) {
    list[idx] = address;
  } else {
    list.push(address);
  }
  writeLocalAddresses(userId, list);
  return list;
}

export function deleteLocalAddress(userId: string, id: string): LocalAddress[] {
  const list = readLocalAddresses(userId).filter((a) => a.id !== id);
  writeLocalAddresses(userId, list);
  return list;
}

export function getDefaultLocalAddress(userId: string): LocalAddress | null {
  const list = readLocalAddresses(userId);
  return list.find((a) => a.isDefault) ?? list[0] ?? null;
}
