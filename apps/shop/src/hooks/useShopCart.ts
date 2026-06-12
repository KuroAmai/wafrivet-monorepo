"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@wafrivet/auth";
import {
  readLocalCart,
  removeFromLocalCart,
  updateLocalCartQuantity,
  type LocalCartItem,
} from "@/lib/localCart";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import { useServerCommerceEnabled, useShopperDraft, useUpsertDraft } from "@/hooks/useShopApi";
import type { DraftCartDto } from "@wafrivet/types";

export type CartLineItem = {
  id: string;
  offerId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

function draftToLines(draft: DraftCartDto | undefined): CartLineItem[] {
  if (!draft?.supplierGroups) return [];
  const lines: CartLineItem[] = [];
  for (const group of draft.supplierGroups) {
    for (const item of group.items ?? []) {
      lines.push({
        id: item.offerId,
        offerId: item.offerId,
        name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity,
      });
    }
  }
  return lines;
}

export function useShopCart() {
  const { user } = useAuth();
  const userId = (user as { id?: string } | null)?.id ?? "guest";
  const serverCommerce = useServerCommerceEnabled();
  const { data: draft, refetch: refetchDraft } = useShopperDraft();
  const upsertDraft = useUpsertDraft();
  const { region } = useShopLocation();

  const [localItems, setLocalItems] = useState<LocalCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!serverCommerce && userId !== "guest") {
      setLocalItems(readLocalCart(userId));
    }
    setHydrated(true);
  }, [userId, serverCommerce]);

  const items: CartLineItem[] = useMemo(() => {
    if (serverCommerce) return draftToLines(draft);
    return localItems.map((i) => ({
      id: i.masterSkuId,
      offerId: i.masterSkuId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }));
  }, [serverCommerce, draft, localItems]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const deliveryFromDraft = draft?.deliveryFee?.consolidatedTotal;
  const delivery =
    typeof deliveryFromDraft === "number"
      ? deliveryFromDraft
      : region?.defaultDeliveryFee ?? 0;
  const total = subtotal + delivery;

  const refreshLocal = useCallback(() => {
    if (userId !== "guest") setLocalItems(readLocalCart(userId));
  }, [userId]);

  const syncServerDraft = useCallback(
    async (nextItems: CartLineItem[]) => {
      if (!serverCommerce) return;
      await upsertDraft.mutateAsync({
        items: nextItems.map((i) => ({ offerId: i.offerId, quantity: i.quantity })),
      });
      await refetchDraft();
    },
    [serverCommerce, upsertDraft, refetchDraft],
  );

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      if (serverCommerce) {
        const next = items
          .map((i) => (i.id === id ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0);
        void syncServerDraft(next);
        return;
      }
      const next = updateLocalCartQuantity(userId, id, quantity);
      setLocalItems(next);
    },
    [serverCommerce, items, syncServerDraft, userId],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (serverCommerce) {
        const next = items.filter((i) => i.id !== id);
        void syncServerDraft(next);
        return;
      }
      const next = removeFromLocalCart(userId, id);
      setLocalItems(next);
    },
    [serverCommerce, items, syncServerDraft, userId],
  );

  return {
    items,
    subtotal,
    delivery,
    total,
    serverCommerce,
    /** @deprecated use serverCommerce */
    vetCommerce: serverCommerce,
    hydrated,
    refetchDraft,
    refreshLocal,
    setQuantity,
    removeItem,
    orderId: draft?.orderId,
  };
}
