"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { persistLoginSession } from "@/lib/persistLoginSession";
import { resolveAuthDestination } from "@/lib/resolveAuthDestination";

function clearPendingSignup() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem("wafrivet_pending_email");
  sessionStorage.removeItem("wafrivet_pending_password");
  sessionStorage.removeItem("wafrivet_pending_role");
}

const LENGTH = 6;

export function OTPInput() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (idx: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    if (char && idx < LENGTH - 1) inputRefs.current[idx + 1]?.focus();
    if (next.every((d) => d) && next.join("").length === LENGTH) {
      handleVerify(next.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    const next = [...digits];
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  const navigateAfterAuth = async () => {
    const destination = await resolveAuthDestination();
    clearPendingSignup();
    if (destination.startsWith("http")) {
      window.location.href = destination;
      return;
    }
    router.push(destination);
    router.refresh();
  };

  const handleVerify = async (code: string) => {
    setIsVerifying(true);
    setApiError(null);

    const mockEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true";
    if (mockEnabled) {
      await fetch("/api/auth/session", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: "mock-token" }),
      });
      await navigateAfterAuth();
      return;
    }

    const email =
      typeof sessionStorage !== "undefined"
        ? (sessionStorage.getItem("wafrivet_pending_email") ?? "")
        : "";

    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token: code }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setApiError((body as { message?: string }).message ?? "Verification failed.");
      setIsVerifying(false);
      return;
    }

    const loginRes = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: sessionStorage.getItem("wafrivet_pending_password") ?? "",
      }),
    });
    const loginData = await loginRes.json().catch(() => ({}));

    if (!loginRes.ok) {
      setApiError(
        (loginData as { message?: string }).message ??
          "Verified, but sign-in failed. Try signing in from the login page.",
      );
      setIsVerifying(false);
      return;
    }

    persistLoginSession(loginData as { accessToken?: string; expiresIn?: number });
    await navigateAfterAuth();
  };

  const code = digits.join("");
  const isComplete = code.length === LENGTH && digits.every((d) => d);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
          Verify your phone
        </h1>
        <p className="text-[15px] text-gray-500 mt-1.5">
          Enter the 6-digit code we sent to your number
        </p>
      </div>

      {apiError ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </p>
      ) : null}

      <div className="flex gap-2.5 justify-between mb-8" onPaste={handlePaste}>
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`w-12 h-14 text-center text-xl font-semibold rounded-xl border outline-none transition-all
              ${digit ? "border-[#2D4D31] bg-[#f0f4f0] text-[#2D4D31]" : "border-gray-200 bg-gray-50 text-gray-900"}
              focus:border-[#2D4D31] focus:bg-white`}
          />
        ))}
      </div>

      <Button
        onPress={() => isComplete && handleVerify(code)}
        isDisabled={!isComplete || isVerifying}
        className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all disabled:opacity-40"
      >
        {isVerifying ? (
          "Verifying…"
        ) : (
          <>
            Verify code <ArrowRight size={17} className="ml-1" />
          </>
        )}
      </Button>

      <div className="mt-6 text-center">
        {countdown > 0 ? (
          <p className="text-[14px] text-gray-500">
            Resend code in <span className="font-semibold text-gray-700">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setCountdown(60)}
            className="text-[14px] text-[#2D4D31] font-semibold hover:underline"
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
