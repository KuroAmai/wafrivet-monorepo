"use client";

import { MapPin, Plus, House } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useAuth } from "@wafrivet/auth";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import {
  deleteLocalAddress,
  readLocalAddresses,
  upsertLocalAddress,
  type LocalAddress,
} from "@/lib/localAddresses";
import { usePatchVetProfile, useShopperCommerceEnabled, useVetProfile } from "@/hooks/useShopApi";

export default function AddressesPage() {
  const { user } = useAuth();
  const userId = (user as { id?: string } | null)?.id ?? "";
  const vetCommerce = useShopperCommerceEnabled();
  const { region } = useShopLocation();
  const { data: vetProfile, refetch } = useVetProfile();
  const patchProfile = usePatchVetProfile();
  const [localAddresses, setLocalAddresses] = useState<LocalAddress[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ address: "", city: "" });

  useEffect(() => {
    if (userId) setLocalAddresses(readLocalAddresses(userId));
  }, [userId]);

  const vetAddress = vetProfile?.address
    ? [
        {
          id: "vet-primary",
          type: "Clinic",
          icon: House,
          address: vetProfile.address,
          city: region?.regionName ?? "",
          isDefault: true,
        },
      ]
    : [];

  const displayAddresses = vetCommerce
    ? vetAddress
    : localAddresses.map((a) => ({ ...a, icon: House }));

  const handleSaveVet = async () => {
    await patchProfile.mutateAsync({
      address: form.address,
    });
    setEditing(false);
    void refetch();
  };

  const handleAddLocal = () => {
    if (!userId || !form.address.trim()) return;
    const entry: LocalAddress = {
      id: crypto.randomUUID(),
      type: "Home",
      address: form.address,
      city: form.city || region?.regionName || "",
      isDefault: localAddresses.length === 0,
    };
    setLocalAddresses(upsertLocalAddress(userId, entry));
    setForm({ address: "", city: "" });
    setEditing(false);
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

      {editing ? (
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4">
          <input
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            placeholder="Street address"
            className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
          />
          {!vetCommerce ? (
            <input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              placeholder="City"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 font-medium"
            />
          ) : null}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void (vetCommerce ? handleSaveVet() : handleAddLocal())}
              className="px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px]"
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
        {displayAddresses.length === 0 ? (
          <p className="text-center text-gray-400 font-medium py-8">No addresses saved yet.</p>
        ) : (
          displayAddresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                  <MapPin size={28} weight="bold" />
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
                <button
                  type="button"
                  onClick={() => {
                    if (userId) setLocalAddresses(deleteLocalAddress(userId, addr.id));
                  }}
                  className="text-[13px] font-bold text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
