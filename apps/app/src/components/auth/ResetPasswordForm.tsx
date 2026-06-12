"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, ArrowRight, CheckCircle } from "@phosphor-icons/react";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function Field({
  label,
  error,
  type = "text",
  endContent,
  registration,
}: {
  label: string;
  error?: string;
  type?: string;
  endContent?: React.ReactNode;
  registration: any;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-medium text-gray-600">{label}</label>
      <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:border-[#2D4D31] focus-within:bg-white"}`}>
        <input
          {...registration}
          type={type}
          className="flex-1 px-4 py-3.5 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        {endContent && <div className="pr-3">{endContent}</div>}
      </div>
      {error && <p className="text-[12px] text-red-500 pl-1">{error}</p>}
    </div>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    // Mock API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[#2D4D31]">
            <CheckCircle size={40} weight="fill" />
          </div>
        </div>
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight mb-2">Password reset</h1>
        <p className="text-[15px] text-gray-600 mb-8">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
        <Link 
          href="/login" 
          className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all"
        >
          Sign in to your account <ArrowRight size={17} weight="bold" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">Create new password</h1>
        <p className="text-[15px] text-gray-600 mt-1.5">Please enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field
          label="New Password"
          type={showPass ? "text" : "password"}
          error={errors.password?.message as string}
          registration={register("password")}
          endContent={
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
              {showPass ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="regular" />}
            </button>
          }
        />
        <Field
          label="Confirm New Password"
          type={showConfirmPass ? "text" : "password"}
          error={errors.confirmPassword?.message as string}
          registration={register("confirmPassword")}
          endContent={
            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
              {showConfirmPass ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="regular" />}
            </button>
          }
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all active:scale-[0.98] mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Resetting password…
            </>
          ) : (
            <>Reset password <ArrowRight size={17} weight="bold" /></>
          )}
        </button>
      </form>
    </div>
  );
}
