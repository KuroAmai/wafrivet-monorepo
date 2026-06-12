"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { SealCheck, WarningCircle } from "@phosphor-icons/react";

export default function PaymentReturnClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your payment…");

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const reference = searchParams.get("reference") ?? searchParams.get("trxref");
    const orderId = searchParams.get("orderId");

    if (!paymentId) {
      if (orderId) {
        router.replace(`/profile/orders/${orderId}`);
        return;
      }
      setStatus("error");
      setMessage("Missing payment reference. Check your orders for status.");
      return;
    }

    const verify = async () => {
      try {
        const query = reference ? `?source=redirect&reference=${encodeURIComponent(reference)}` : "";
        const res = await fetch(`/api/payments/${paymentId}/verify${query}`);
        const data = (await res.json().catch(() => ({}))) as {
          status?: string;
          orderId?: string;
          message?: string;
        };
        if (!res.ok) {
          throw new Error(data.message ?? "Payment verification failed");
        }
        setStatus("success");
        setMessage("Payment confirmed. Thank you for your order.");
        const targetOrder = data.orderId ?? orderId;
        if (targetOrder) {
          setTimeout(() => router.replace(`/profile/orders/${targetOrder}`), 2000);
        }
      } catch (e) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Payment verification failed");
      }
    };

    void verify();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      <main className="max-w-lg mx-auto px-6 pt-24 text-center">
        {status === "loading" ? (
          <p className="text-gray-600 font-medium">{message}</p>
        ) : status === "success" ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <SealCheck size={36} weight="fill" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Payment successful</h1>
            <p className="text-gray-500">{message}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <WarningCircle size={36} weight="fill" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Payment issue</h1>
            <p className="text-gray-500">{message}</p>
            <Link href="/profile/orders" className="inline-block text-[#2D4D31] font-bold hover:underline">
              View orders
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
