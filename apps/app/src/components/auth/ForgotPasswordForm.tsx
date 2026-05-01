"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const schema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
});

export function ForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">Check your messages</h1>
          <p className="text-[15px] text-gray-500 mt-1.5">
            We've sent a reset link to your contact. It expires in 15 minutes.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-[#2D4D31]/20 bg-[#f0f4f0] text-[14px] text-[#2D4D31] mb-6">
          Didn't receive it? Check your spam folder or try a different contact method.
        </div>
        <Link href="/login" className="w-full h-[52px] bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all flex items-center justify-center gap-2">
          Back to sign in <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">Reset password</h1>
        <p className="text-[15px] text-gray-500 mt-1.5">We'll send a reset link to your email or phone</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">Email or Phone Number</label>
          <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${errors.emailOrPhone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:border-[#2D4D31] focus-within:bg-white"}`}>
            <input
              {...register("emailOrPhone")}
              className="flex-1 px-4 py-3.5 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="you@example.com or +234..."
            />
          </div>
          {errors.emailOrPhone && <p className="text-[12px] text-red-500 pl-1">{errors.emailOrPhone.message as string}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all mt-2 active:scale-[0.98] disabled:opacity-60"
        >
          {isSubmitting ? (
            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> Sending…</>
          ) : (
            <>Send reset link <ArrowRight size={17} /></>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-[14px] text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={15} /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
