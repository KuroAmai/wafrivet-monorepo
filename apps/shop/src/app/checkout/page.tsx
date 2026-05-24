"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import {
  MapPin,
  CreditCard,
  Truck,
  SealCheck,
  ShieldCheck,
  CaretLeft,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@wafrivet/auth";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import { useShopCart } from "@/hooks/useShopCart";
import {
  useInitializePayment,
  useShopperAddresses,
  useShopperCommerceEnabled,
  useSubmitOrder,
  useVetProfile,
} from "@/hooks/useShopApi";
import { isRegularCustomerOnly } from "@/lib/shopperCapabilities";
import { fullNameFromProfile } from "@/lib/mapAuthMe";
import { formatShopperAddressLine, pickDefaultShopperAddress } from "@/lib/formatShopperAddress";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const profile = user as {
    id?: string;
    roles?: string[];
    role?: string;
    email?: string;
    phone?: string;
  } | null;
  const { region, openPicker } = useShopLocation();
  const { items, subtotal, delivery, total, vetCommerce, orderId } = useShopCart();
  const { data: vetProfile } = useVetProfile();
  const { data: shopperAddresses } = useShopperAddresses();
  const submitOrder = useSubmitOrder();
  const initPayment = useInitializePayment();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const customerOnly = isRegularCustomerOnly(profile?.roles, profile?.role);
  const defaultShopperAddr = pickDefaultShopperAddress(shopperAddresses);
  const displayName = fullNameFromProfile(profile) ?? "Customer";
  const addressLine =
    vetProfile?.address ??
    (defaultShopperAddr ? formatShopperAddressLine(defaultShopperAddr) : null) ??
    `Delivery region: ${region?.regionName ?? "Not selected"}`;
  const phone = vetProfile?.phone ?? defaultShopperAddr?.phone ?? profile?.phone ?? "—";

  const handlePay = async () => {
    if (!vetCommerce) return;
    setPaying(true);
    setError(null);
    try {
      let oid = orderId;
      if (!oid) {
        const submitted = await submitOrder.mutateAsync();
        oid = String((submitted as { id?: string }).id ?? (submitted as { orderId?: string }).orderId ?? "");
      }
      if (!oid) throw new Error("Could not create order");
      const payment = await initPayment.mutateAsync({ orderId: oid });
      if (payment.authorizationUrl) {
        window.location.href = payment.authorizationUrl;
        return;
      }
      router.push(`/profile/orders/${oid}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <CaretLeft size={18} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-[14px]">Back to Marketplace</span>
        </Link>

        <h1 className="text-[32px] font-black text-gray-900 tracking-tight mb-10">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2D4D31]" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                    <MapPin size={22} weight="fill" />
                  </div>
                  <h2 className="text-[18px] font-black text-gray-900">Delivery</h2>
                </div>
                <button
                  type="button"
                  onClick={openPicker}
                  className="text-[13px] font-black text-[#2D4D31] hover:underline"
                >
                  Change region
                </button>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-900 mb-1">{displayName}</p>
                <p className="text-[14px] text-gray-500 leading-relaxed whitespace-pre-line">
                  {addressLine}
                  {"\n"}
                  {phone}
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                  <Truck size={22} weight="fill" />
                </div>
                <h2 className="text-[18px] font-black text-gray-900">Delivery Method</h2>
              </div>
              <div className="p-5 bg-[#2D4D31]/5 rounded-2xl border-2 border-[#2D4D31] flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">Standard Delivery</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">{region?.regionName ?? "Your region"}</p>
                </div>
                <span className="text-[14px] font-black text-[#2D4D31]">₦{delivery.toLocaleString()}</span>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                  <CreditCard size={22} weight="fill" />
                </div>
                <h2 className="text-[18px] font-black text-gray-900">Payment</h2>
              </div>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                Pay securely with Paystack at checkout. Card details are not stored on Wafrivet.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-[18px] font-black text-gray-900 mb-6 tracking-tight">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-500 font-medium">Subtotal ({items.length} items)</span>
                  <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-500 font-medium">Delivery Fee</span>
                  <span className="font-bold text-gray-900">₦{delivery.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-gray-50 flex justify-between items-baseline">
                  <span className="font-black text-gray-900 text-[18px]">Total</span>
                  <span className="font-black text-[#2D4D31] text-[24px]">₦{total.toLocaleString()}</span>
                </div>
              </div>

              {error ? <p className="text-[13px] text-red-600 mb-4 font-medium">{error}</p> : null}

              {vetCommerce ? (
                <button
                  type="button"
                  disabled={paying || items.length === 0}
                  onClick={() => void handlePay()}
                  className="w-full h-16 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[16px] hover:bg-[#243f28] transition-all shadow-xl shadow-[#2D4D31]/20 disabled:opacity-50"
                >
                  {paying ? "Processing…" : "Confirm and Pay"}
                  <SealCheck size={24} weight="fill" />
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-[13px] text-gray-500 text-center">
                    {customerOnly
                      ? "Checkout is available for verified clinic accounts."
                      : "Sign in to complete your purchase."}
                  </p>
                  {customerOnly ? (
                    <a
                      href={`${APP_URL}/onboarding`}
                      className="w-full h-14 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center font-black text-[15px]"
                    >
                      Register as a clinic
                    </a>
                  ) : null}
                </div>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheck size={16} weight="bold" />
                <span className="text-[11px] font-black uppercase tracking-widest">Paystack Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
