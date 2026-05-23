"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCentralSignupUrl } from "@wafrivet/auth";
import { persistReturnTo } from "@/lib/authReturnTo";
import { resolvePostAuthDestination } from "@/lib/resolvePostAuthDestination";
import { Eye, EyeSlash, ArrowRight } from "@phosphor-icons/react";
import { toAuthEmail } from "@/lib/authIdentifier";
import { persistLoginSession } from "@/lib/persistLoginSession";

const schema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [showPass, setShowPass] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    persistReturnTo(returnTo);
  }, [returnTo]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setApiError(null);
    const email = toAuthEmail(values.emailOrPhone);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: values.password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setApiError(data.message ?? "Sign in failed. Check your credentials.");
      return;
    }

    persistLoginSession(data);

    const destination = await resolvePostAuthDestination(returnTo);
    if (destination.startsWith("http")) {
      window.location.href = destination;
      return;
    }
    router.push(destination);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">Welcome back</h1>
        <p className="text-[15px] text-gray-500 mt-1.5">Sign in to your Wafrivet account</p>
      </div>

      {apiError ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </p>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field
          label="Email or Phone Number"
          error={errors.emailOrPhone?.message as string}
          registration={register("emailOrPhone")}
        />
        <Field
          label="Password"
          type={showPass ? "text" : "password"}
          error={errors.password?.message as string}
          registration={register("password")}
          endContent={
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
              {showPass ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="regular" />}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#2D4D31]" />
            <span className="text-[13px] text-gray-600">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-[13px] text-[#2D4D31] font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Signing in…
            </>
          ) : (
            <>Sign in <ArrowRight size={17} weight="bold" /></>
          )}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wide">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-center text-[14px] text-gray-500">
        Don&apos;t have an account?{" "}
        <a
          href={getCentralSignupUrl(returnTo)}
          className="text-[#2D4D31] font-semibold hover:underline"
        >
          Create one free →
        </a>
      </p>
    </div>
  );
}
