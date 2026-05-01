"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RoleSelector } from "./RoleSelector";
import { UserRole } from "@wafrivet/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, ArrowRight } from "@phosphor-icons/react";

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  role: z.enum(["farmer", "vet", "chemist", "distributor"], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

function Field({
  label,
  error,
  type = "text",
  endContent,
  registration,
  placeholder,
}: {
  label: string;
  error?: string;
  type?: string;
  endContent?: React.ReactNode;
  registration: any;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-medium text-gray-600">{label}</label>
      <div className={`flex items-center border rounded-xl overflow-hidden transition-all ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:border-[#2D4D31] focus-within:bg-white"}`}>
        <input
          {...registration}
          type={type}
          placeholder={placeholder}
          className="flex-1 px-4 py-3.5 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        {endContent && <div className="pr-3">{endContent}</div>}
      </div>
      {error && <p className="text-[12px] text-red-500 pl-1">{error}</p>}
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      password: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: SignupFormData) => {
    // API call mock
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/verify");
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
          Create an account
        </h1>
        <p className="text-[15px] text-gray-500 mt-1.5">Join Wafrivet — it's free to get started</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field
          label="Full Name"
          error={errors.fullName?.message}
          registration={register("fullName")}
          placeholder="e.g. Emeka Okafor"
        />
        
        <Field
          label="Phone Number"
          error={errors.phone?.message}
          registration={register("phone")}
          placeholder="+234 800 000 0000"
        />

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">Select your role</label>
          <RoleSelector 
            selectedRole={selectedRole as UserRole} 
            onSelect={(role) => setValue("role", role, { shouldValidate: true })} 
          />
          {errors.role && <p className="text-[12px] text-red-500 pl-1">{errors.role.message}</p>}
        </div>

        <Field
          label="Create Password"
          type={showPass ? "text" : "password"}
          error={errors.password?.message}
          registration={register("password")}
          placeholder="At least 8 characters"
          endContent={
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPass ? <EyeSlash size={17} weight="regular" /> : <Eye size={17} weight="regular" />}
            </button>
          }
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all mt-6 active:scale-[0.98] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>{" "}
              Creating account…
            </>
          ) : (
            <>
              Create account <ArrowRight size={17} />
            </>
          )}
        </button>

        <p className="text-center text-[14px] text-gray-500 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-[#2D4D31] font-semibold hover:underline">
            Sign in →
          </Link>
        </p>
      </form>
    </div>
  );
}
