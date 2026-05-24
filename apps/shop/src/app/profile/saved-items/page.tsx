"use client";

import { Heart, ShoppingCart, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { catalogApi, queryKeys } from "@wafrivet/api";
import { useAuth } from "@wafrivet/auth";
import { addToLocalCart } from "@/lib/localCart";
import {
  useRemoveWishlistItem,
  useShopperCommerceEnabled,
  useShopperWishlist,
} from "@/hooks/useShopApi";

export default function SavedItemsPage() {
  const { user } = useAuth();
  const userId = (user as { id?: string } | null)?.id ?? "";
  const vetCommerce = useShopperCommerceEnabled();
  const { data: items = [], isLoading } = useShopperWishlist();
  const removeItem = useRemoveWishlistItem();

  const catalogQueries = useQueries({
    queries: items.map((item) => ({
      queryKey: queryKeys.catalog.item(item.masterSkuId),
      queryFn: () => catalogApi.getCatalogItem(item.masterSkuId),
      enabled: Boolean(item.masterSkuId) && !item.productName && !item.name,
    })),
  });

  const enriched = items.map((item, i) => {
    const catalog = catalogQueries[i]?.data;
    const name = item.productName ?? item.name ?? catalog?.name ?? "Product";
    const image =
      item.imageUrl ??
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
    const price = item.price != null ? String(item.price) : "0";
    return { ...item, name, image, price };
  });

  const remove = (masterSkuId: string) => {
    void removeItem.mutateAsync(masterSkuId);
  };

  const moveToCart = (item: { masterSkuId: string; name: string; price: string; image: string }) => {
    if (!userId || vetCommerce) return;
    const price = Number(String(item.price).replace(/[^\d.]/g, "")) || 0;
    addToLocalCart(userId, {
      masterSkuId: item.masterSkuId,
      name: item.name,
      price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Saved Items</h2>
        <p className="text-[14px] font-bold text-gray-400">{enriched.length} items</p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400 font-medium py-8">Loading saved items…</p>
      ) : enriched.length === 0 ? (
        <div className="bg-white p-12 rounded-[40px] border border-gray-100 text-center">
          <Heart size={40} className="mx-auto text-gray-300 mb-4" weight="duotone" />
          <p className="text-[15px] font-bold text-gray-900 mb-2">No saved items</p>
          <p className="text-[13px] text-gray-500 mb-6">Tap the heart on a product to save it here.</p>
          <Link href="/" className="text-[14px] font-black text-[#2D4D31] hover:underline">
            Browse marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enriched.map((item) => (
            <div
              key={item.masterSkuId}
              className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              <img
                src={item.image}
                alt=""
                className="w-24 h-24 rounded-2xl object-cover bg-gray-50"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-black text-gray-900 text-[16px] mb-1">{item.name}</h3>
                <p className="text-[16px] font-black text-[#2D4D31]">
                  ₦{Number(item.price).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!vetCommerce ? (
                  <button
                    type="button"
                    onClick={() => moveToCart(item)}
                    className="px-4 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[13px] flex items-center gap-2"
                  >
                    <ShoppingCart size={16} weight="bold" />
                    Add to cart
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => remove(item.masterSkuId)}
                  disabled={removeItem.isPending}
                  className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl disabled:opacity-50"
                  aria-label="Remove"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
