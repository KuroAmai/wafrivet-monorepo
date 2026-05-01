"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const LENGTH = 6;

export function OTPInput() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (idx: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    if (char && idx < LENGTH - 1) inputRefs.current[idx + 1]?.focus();
    if (next.every(d => d) && next.join("").length === LENGTH) {
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
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  const handleVerify = async (code: string) => {
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 1200));
    // Mock success — redirect by role
    window.location.href = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com/dashboard";
  };

  const code = digits.join("");
  const isComplete = code.length === LENGTH && digits.every(d => d);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">Verify your phone</h1>
        <p className="text-[15px] text-gray-500 mt-1.5">Enter the 6-digit code we sent to your number</p>
      </div>

      {/* OTP boxes */}
      <div className="flex gap-2.5 justify-between mb-8" onPaste={handlePaste}>
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={el => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(idx, e.target.value)}
            onKeyDown={e => handleKeyDown(idx, e)}
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
        {isVerifying ? "Verifying…" : (
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
