"use client";

import {
  Package,
  MagnifyingGlass,
  ArrowClockwise,
  Plus,
  X,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import type { MasterSkuDto, SupplierOfferDto } from "@wafrivet/types";
import {
  useCatalog,
  useCreateSupplierOffer,
  useDeleteSupplierOffer,
  useSupplierOffers,
  useUpdateSupplierOffer,
} from "@/hooks/useShopApi";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";

type OfferRow = SupplierOfferDto & { skuName?: string; pricePerUnit?: number };

function offerPrice(offer: OfferRow): number {
  return Number(offer.price ?? offer.pricePerUnit ?? 0);
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [selectedSku, setSelectedSku] = useState<MasterSkuDto | null>(null);
  const [form, setForm] = useState({
    price: "",
    stockQuantity: "",
    batchNumber: "",
    expiryDate: "",
    minOrderQty: "1",
  });

  const { data: offers, isLoading, isError, error, refetch } = useSupplierOffers({ limit: 100 });
  const { data: catalog } = useCatalog(catalogSearch || undefined);
  const createOffer = useCreateSupplierOffer();
  const updateOffer = useUpdateSupplierOffer();
  const deleteOffer = useDeleteSupplierOffer();

  const rows = useMemo(() => {
    const list = (offers ?? []) as OfferRow[];
    return list.filter((item) => {
      const label = `${item.skuName ?? item.productName ?? ""}`.toLowerCase();
      return label.includes(searchTerm.toLowerCase());
    });
  }, [offers, searchTerm]);

  const resetForm = () => {
    setSelectedSku(null);
    setCatalogSearch("");
    setForm({ price: "", stockQuantity: "", batchNumber: "", expiryDate: "", minOrderQty: "1" });
    setShowForm(false);
  };

  const handleCreate = async () => {
    if (!selectedSku) {
      toast.error("Select a catalog product first");
      return;
    }
    try {
      await createOffer.mutateAsync({
        masterSkuId: selectedSku.id,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        batchNumber: form.batchNumber,
        expiryDate: form.expiryDate,
        minOrderQty: Number(form.minOrderQty) || 1,
      });
      toast.success("Offer created");
      resetForm();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to create offer";
      if (msg.toLowerCase().includes("kyc")) {
        toast.error("KYC approval required before listing products");
        window.location.href = `${APP_URL}/onboarding`;
        return;
      }
      toast.error(msg);
    }
  };

  const handleToggleActive = async (offer: OfferRow) => {
    try {
      await updateOffer.mutateAsync({
        offerId: offer.id,
        isActive: offer.isActive === false,
      });
      toast.success("Offer updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  const handleDelete = async (offerId: string) => {
    try {
      await deleteOffer.mutateAsync(offerId);
      toast.success("Offer removed");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">
            Inventory Management
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Live supplier offers from the marketplace API
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#243f28] transition-all shadow-lg shadow-[#2D4D31]/10"
        >
          <Plus size={16} weight="bold" /> Add New Item
        </button>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError && !isMockDataEnabled()}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && rows.length === 0}
        onRetry={() => refetch()}
      />

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your offers..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-[#2D4D31]/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ArrowClockwise size={16} /> Sync
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Price</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <Package size={20} weight="duotone" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-[14px]">
                          {item.skuName ?? item.productName ?? item.masterSkuId}
                        </p>
                        <p className="text-[11px] text-gray-400 font-medium">Offer {item.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] font-bold text-gray-900">
                    {item.stockQuantity ?? 0}
                  </td>
                  <td className="px-8 py-5 text-[14px] font-bold text-gray-900">
                    ₦{offerPrice(item).toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-right space-x-3">
                    <button
                      type="button"
                      onClick={() => void handleToggleActive(item)}
                      className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline"
                    >
                      {item.isActive === false ? "Activate" : "Deactivate"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item.id)}
                      className="text-[11px] font-black text-red-500 uppercase tracking-widest hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm ? (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">List a product</h2>
              <button type="button" onClick={resetForm} className="p-2 rounded-xl bg-gray-50">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search master catalog..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-2xl text-sm font-medium"
              />
              <div className="max-h-40 overflow-y-auto space-y-2">
                {(Array.isArray(catalog) ? catalog : []).slice(0, 8).map((sku) => (
                  <button
                    key={sku.id}
                    type="button"
                    onClick={() => setSelectedSku(sku)}
                    className={`w-full text-left p-3 rounded-xl border text-sm font-medium ${
                      selectedSku?.id === sku.id
                        ? "border-[#2D4D31] bg-[#2D4D31]/5"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    {sku.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price (₦)"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="p-3 bg-gray-50 rounded-xl text-sm"
                />
                <input
                  type="number"
                  placeholder="Stock qty"
                  value={form.stockQuantity}
                  onChange={(e) => setForm((f) => ({ ...f, stockQuantity: e.target.value }))}
                  className="p-3 bg-gray-50 rounded-xl text-sm"
                />
                <input
                  type="text"
                  placeholder="Batch number"
                  value={form.batchNumber}
                  onChange={(e) => setForm((f) => ({ ...f, batchNumber: e.target.value }))}
                  className="p-3 bg-gray-50 rounded-xl text-sm"
                />
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
                  className="p-3 bg-gray-50 rounded-xl text-sm"
                />
              </div>

              <button
                type="button"
                disabled={createOffer.isPending}
                onClick={() => void handleCreate()}
                className="w-full py-4 bg-[#2D4D31] text-white rounded-2xl font-black disabled:opacity-50"
              >
                {createOffer.isPending ? "Saving…" : "Create offer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
