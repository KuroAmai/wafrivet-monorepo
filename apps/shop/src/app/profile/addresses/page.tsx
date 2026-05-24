"use client";

import { MapPin, Plus, House } from "@phosphor-icons/react";
import { useState } from "react";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import type { ShopperAddressType } from "@wafrivet/types";
import {
  useCreateShopperAddress,
  useDeleteShopperAddress,
  usePatchVetProfile,
  useSetDefaultShopperAddress,
  useShopperAddresses,
  useShopperCommerceEnabled,
  useVetProfile,
} from "@/hooks/useShopApi";
import { formatShopperAddressLine } from "@/lib/formatShopperAddress";

const ADDRESS_TYPES: { value: ShopperAddressType; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "work", label: "Work" },
  { value: "other", label: "Other" },
];

export default function AddressesPage() {
  const vetCommerce = useShopperCommerceEnabled();
  const { region } = useShopLocation();
  const { data: vetProfile, refetch } = useVetProfile();
  const patchProfile = usePatchVetProfile();
  const { data: apiAddresses = [], isLoading, refetch: refetchAddresses } = useShopperAddresses();
  const createAddress = useCreateShopperAddress();
  const deleteAddress = useDeleteShopperAddress();
  const setDefault = useSetDefaultShopperAddress();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    label: "",
    type: "home" as ShopperAddressType,
    fullAddress: "",
    city: "",
    state: "",
    phone: "",
    deliveryInstructions: "",
    isDefault: false,
  });
  const [error, setError] = useState<string | null>(null);

  const vetAddress = vetProfile?.address
    ? [
        {
          id: "vet-primary",
          type: "Clinic",
          address: vetProfile.address,
          city: region?.regionName ?? "",
          isDefault: true,
        },
      ]
    : [];

  const shopperDisplay = apiAddresses.map((a) => ({
    id: a.id,
    type: (a.label ?? a.type ?? "Address").replace(/^./, (c) => c.toUpperCase()),
    address: formatShopperAddressLine(a),
    city: a.city ?? "",
    isDefault: Boolean(a.isDefault),
    phone: a.phone,
  }));

  const displayAddresses = vetCommerce ? vetAddress : shopperDisplay;

  const handleSaveVet = async () => {
    await patchProfile.mutateAsync({ address: form.fullAddress });
    setEditing(false);
    void refetch();
  };

  const handleAddShopper = async () => {
    if (!form.fullAddress.trim()) return;
    setError(null);
    try {
      await createAddress.mutateAsync({
        label: form.label || undefined,
        type: form.type,
        fullAddress: form.fullAddress.trim(),
        city: form.city || region?.regionName || undefined,
        state: form.state || undefined,
        phone: form.phone || undefined,
        deliveryInstructions: form.deliveryInstructions || undefined,
        isDefault: form.isDefault || apiAddresses.length === 0,
      });
      setForm({
        label: "",
        type: "home",
        fullAddress: "",
        city: "",
        state: "",
        phone: "",
        deliveryInstructions: "",
        isDefault: false,
      });
      setEditing(false);
      void refetchAddresses();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save address");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">My Addresses</h2>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px] hover:bg-[#2D4D31]/90 transition-all"
        >
          <Plus size={18} weight="bold" />
          {vetCommerce ? "Update address" : "Add New Address"}
        </button>
      </div>

      {error ? <p className="text-[13px] text-red-600 px-2">{error}</p> : null}

      {editing ? (
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4">
          {!vetCommerce ? (
            <>
              <input
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="Label (e.g. Home)"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
              />
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value as ShopperAddressType }))
                }
                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
              >
                {ADDRESS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </>
          ) : null}
          <input
            value={form.fullAddress}
            onChange={(e) => setForm((f) => ({ ...f, fullAddress: e.target.value }))}
            placeholder="Street address"
            className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
          />
          {!vetCommerce ? (
            <>
              <input
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="City"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
              />
              <input
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                placeholder="State"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Phone"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
              />
              <textarea
                value={form.deliveryInstructions}
                onChange={(e) => setForm((f) => ({ ...f, deliveryInstructions: e.target.value }))}
                placeholder="Delivery instructions"
                className="w-full min-h-[80px] p-4 rounded-xl border border-gray-200 font-medium"
              />
              <label className="flex items-center gap-2 text-[14px] font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                />
                Set as default address
              </label>
            </>
          ) : null}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void (vetCommerce ? handleSaveVet() : handleAddShopper())}
              disabled={createAddress.isPending || patchProfile.isPending}
              className="px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px] disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-[14px]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4">
        {isLoading && !vetCommerce ? (
          <p className="text-center text-gray-400 font-medium py-8">Loading addresses…</p>
        ) : displayAddresses.length === 0 ? (
          <p className="text-center text-gray-400 font-medium py-8">No addresses saved yet.</p>
        ) : (
          displayAddresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                  <House size={28} weight="bold" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-gray-900 text-[16px]">{addr.type}</h3>
                    {addr.isDefault ? (
                      <span className="px-2.5 py-0.5 bg-[#2D4D31]/10 text-[#2D4D31] rounded-lg text-[10px] font-black uppercase tracking-wider">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[14px] text-gray-500 font-medium">
                    {addr.address}
                    {addr.city ? `, ${addr.city}` : ""}
                  </p>
                </div>
              </div>
              {!vetCommerce ? (
                <div className="flex flex-col items-end gap-2">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => void setDefault.mutateAsync(addr.id)}
                      className="text-[13px] font-bold text-[#2D4D31] hover:underline"
                    >
                      Set default
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => void deleteAddress.mutateAsync(addr.id)}
                    className="text-[13px] font-bold text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
