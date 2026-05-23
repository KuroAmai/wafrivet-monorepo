export type LocalCartItem = {
  masterSkuId: string;
  offerId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

const cartKey = (userId: string) => `wafrivet_shop_cart_${userId}`;

export function readLocalCart(userId: string): LocalCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(cartKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LocalCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalCart(userId: string, items: LocalCartItem[]): void {
  localStorage.setItem(cartKey(userId), JSON.stringify(items));
}

export function addToLocalCart(userId: string, item: LocalCartItem): LocalCartItem[] {
  const items = readLocalCart(userId);
  const idx = items.findIndex((i) => i.masterSkuId === item.masterSkuId);
  if (idx >= 0) {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
  } else {
    items.push(item);
  }
  writeLocalCart(userId, items);
  return items;
}

export function updateLocalCartQuantity(
  userId: string,
  masterSkuId: string,
  quantity: number,
): LocalCartItem[] {
  let items = readLocalCart(userId);
  if (quantity <= 0) {
    items = items.filter((i) => i.masterSkuId !== masterSkuId);
  } else {
    items = items.map((i) => (i.masterSkuId === masterSkuId ? { ...i, quantity } : i));
  }
  writeLocalCart(userId, items);
  return items;
}

export function removeFromLocalCart(userId: string, masterSkuId: string): LocalCartItem[] {
  const items = readLocalCart(userId).filter((i) => i.masterSkuId !== masterSkuId);
  writeLocalCart(userId, items);
  return items;
}
