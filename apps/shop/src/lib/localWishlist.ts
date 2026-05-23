const wishlistKey = (userId: string) => `wafrivet_shop_wishlist_${userId}`;

export type WishlistItem = {
  masterSkuId: string;
  name: string;
  price: string;
  image: string;
  chemist?: string;
};

export function readWishlist(userId: string): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(wishlistKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeWishlist(userId: string, items: WishlistItem[]): void {
  localStorage.setItem(wishlistKey(userId), JSON.stringify(items));
}

export function toggleWishlist(userId: string, item: WishlistItem): WishlistItem[] {
  const items = readWishlist(userId);
  const idx = items.findIndex((i) => i.masterSkuId === item.masterSkuId);
  if (idx >= 0) {
    items.splice(idx, 1);
  } else {
    items.push(item);
  }
  writeWishlist(userId, items);
  return items;
}

export function isInWishlist(userId: string, masterSkuId: string): boolean {
  return readWishlist(userId).some((i) => i.masterSkuId === masterSkuId);
}
