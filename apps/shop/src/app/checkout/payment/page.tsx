"use client";

import { Suspense } from "react";
import PaymentReturnClient from "./PaymentReturnClient";

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Verifying payment…
        </div>
      }
    >
      <PaymentReturnClient />
    </Suspense>
  );
}
