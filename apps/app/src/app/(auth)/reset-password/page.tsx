"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log("Resetting to new password");
    // Mock API call
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    }, 1000);
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-black/[0.04]">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#111811]">Create New Password</h1>
        <p className="text-default-500 mt-2">Please enter your new password below</p>
      </div>

      {isSuccess ? (
        <div className="text-center p-4 bg-success-50 text-success-600 rounded-lg">
          Password reset successful! Redirecting to login...
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-gray-600">New Password</label>
            <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:border-[#2D4D31] focus-within:bg-white"}`}>
              <input
                {...register("password")}
                type="password"
                className="flex-1 px-4 py-3.5 bg-transparent text-[15px] text-gray-900 outline-none"
              />
            </div>
            {errors.password && <p className="text-[12px] text-red-500 pl-1">{errors.password.message as string}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-gray-600">Confirm Password</label>
            <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:border-[#2D4D31] focus-within:bg-white"}`}>
              <input
                {...register("confirmPassword")}
                type="password"
                className="flex-1 px-4 py-3.5 bg-transparent text-[15px] text-gray-900 outline-none"
              />
            </div>
            {errors.confirmPassword && <p className="text-[12px] text-red-500 pl-1">{errors.confirmPassword.message as string}</p>}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all mt-4 active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Resetting...
              </>
            ) : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
