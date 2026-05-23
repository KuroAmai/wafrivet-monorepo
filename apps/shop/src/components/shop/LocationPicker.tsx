"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Check } from "@phosphor-icons/react";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import { regionToSelection } from "@/lib/shopLocation";

export function LocationPicker() {
  const {
    isPickerOpen,
    closePicker,
    regions,
    region,
    setRegion,
    isLoading,
    error,
    refetchRegions,
  } = useShopLocation();

  return (
    <AnimatePresence>
      {isPickerOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePicker}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,28rem)] max-h-[80vh] bg-white rounded-[32px] border border-gray-100 shadow-2xl z-[111] flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                  <MapPin size={22} weight="fill" />
                </div>
                <div>
                  <h2 className="text-[18px] font-black text-gray-900">Your location</h2>
                  <p className="text-[12px] text-gray-400 font-medium">Delivery region for fees and availability</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePicker}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {isLoading ? (
                <p className="text-center text-[14px] text-gray-400 py-8 font-medium">Loading regions…</p>
              ) : null}
              {error ? (
                <div className="text-center py-6 space-y-3">
                  <p className="text-[14px] text-red-600 font-medium">{error}</p>
                  <button
                    type="button"
                    onClick={() => void refetchRegions()}
                    className="text-[13px] font-black text-[#2D4D31] hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : null}
              {!isLoading && !error
                ? regions.map((r) => {
                    const selected = region?.regionId === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRegion(regionToSelection(r))}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                          selected
                            ? "border-[#2D4D31] bg-[#2D4D31]/5"
                            : "border-gray-100 hover:border-gray-200 bg-white"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-gray-900 text-[15px]">{r.name}</p>
                          {r.defaultDeliveryFee != null ? (
                            <p className="text-[12px] text-gray-500 mt-0.5">
                              From ₦{Number(r.defaultDeliveryFee).toLocaleString()} delivery
                            </p>
                          ) : null}
                        </div>
                        {selected ? (
                          <Check size={22} weight="bold" className="text-[#2D4D31] shrink-0" />
                        ) : null}
                      </button>
                    );
                  })
                : null}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
