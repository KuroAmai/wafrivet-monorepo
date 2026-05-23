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
import { useShopperCommerceEnabled, useShopperDraft } from "@/hooks/useShopApi";
import type { DraftCartDto } from "@wafrivet/types";

export type CartLineItem = {
  id: string;
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
  const vetCommerce = useShopperCommerceEnabled();
  const { data: draft, refetch: refetchDraft } = useShopperDraft();
  const { region } = useShopLocation();

  const [localItems, setLocalItems] = useState<LocalCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!vetCommerce && userId !== "guest") {
      setLocalItems(readLocalCart(userId));
    }
    setHydrated(true);
  }, [userId, vetCommerce]);

  const items: CartLineItem[] = useMemo(() => {
    if (vetCommerce) return draftToLines(draft);
    return localItems.map((i) => ({
      id: i.masterSkuId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }));
  }, [vetCommerce, draft, localItems]);

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

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      if (vetCommerce) return;
      const next = updateLocalCartQuantity(userId, id, quantity);
      setLocalItems(next);
    },
    [userId, vetCommerce],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (vetCommerce) return;
      const next = removeFromLocalCart(userId, id);
      setLocalItems(next);
    },
    [userId, vetCommerce],
  );

  return {
    items,
    subtotal,
    delivery,
    total,
    vetCommerce,
    hydrated,
    refetchDraft,
    refreshLocal,
    setQuantity,
    removeItem,
    orderId: draft?.orderId,
  };
}
