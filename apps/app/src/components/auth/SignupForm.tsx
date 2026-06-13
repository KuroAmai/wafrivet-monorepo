"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { getCentralLoginUrl } from "@wafrivet/auth";
import { persistReturnTo } from "@/lib/authReturnTo";
import { Eye, EyeSlash, ArrowRight } from "@phosphor-icons/react";
import { toAuthEmail } from "@/lib/authIdentifier";
import type { AuthFieldErrors } from "@/lib/authApiErrors";

const emailOrPhoneSchema = z
  .string()
  .min(1, "Phone or email is required")
  .refine(
    (value) => {
      const trimmed = value.trim();
      if (trimmed.includes("@")) {
        return z.string().email().safeParse(trimmed).success;
      }
      return trimmed.replace(/\D/g, "").length >= 10;
    },
    { message: "Enter a valid phone number (10+ digits) or email address" },
  );

const baseSignupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  emailOrPhone: emailOrPhoneSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must include at least one letter")
    .regex(/[0-9]/, "Password must include at least one number"),
});

const securitySignupSchema = baseSignupSchema.extend({
  companyName: z.string().min(2, "Company name is required"),
  state: z.string().min(2, "State is required"),
  lga: z.string().optional(),
  estimatedDogCount: z.coerce.number().min(0, "Enter estimated dog count"),
});

type SignupFormData = z.infer<typeof securitySignupSchema>;

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
  registration: ReturnType<ReturnType<typeof useForm<SignupFormData>>["register"]>;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-medium text-gray-600">{label}</label>
      <div
        className={`flex items-center border rounded-xl overflow-hidden transition-all ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus-within:border-[#2D4D31] focus-within:bg-white"}`}
      >
        <input
          {...registration}
          type={type}
          placeholder={placeholder}
          className="flex-1 px-4 py-3.5 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        {endContent ? <div className="pr-3">{endContent}</div> : null}
      </div>
      {error ? <p className="text-[12px] text-red-500 pl-1">{error}</p> : null}
    </div>
  );
}

function applyFieldErrors(
  fieldErrors: AuthFieldErrors | undefined,
  setError: ReturnType<typeof useForm<SignupFormData>>["setError"],
) {
  if (!fieldErrors) return;
  if (fieldErrors.fullName) setError("fullName", { type: "server", message: fieldErrors.fullName });
  if (fieldErrors.emailOrPhone) {
    setError("emailOrPhone", { type: "server", message: fieldErrors.emailOrPhone });
  }
  if (fieldErrors.password) setError("password", { type: "server", message: fieldErrors.password });
}

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const signupType = searchParams.get("type");
  const isSecurityCompany = signupType === "security_company";
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    persistReturnTo(returnTo);
  }, [returnTo]);

  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(isSecurityCompany ? securitySignupSchema : baseSignupSchema),
    defaultValues: {
      fullName: "",
      emailOrPhone: "",
      password: "",
      companyName: "",
      state: "",
      lga: "",
      estimatedDogCount: 0,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setApiError(null);
    clearErrors();

    const parts = data.fullName.trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") || firstName;
    const email = toAuthEmail(data.emailOrPhone);
    const phone = data.emailOrPhone.includes("@")
      ? data.emailOrPhone
      : data.emailOrPhone.replace(/\D/g, "");

    const endpoint = isSecurityCompany ? "/api/auth/register-security-company" : "/api/auth/signup";
    const payload = isSecurityCompany
      ? {
          email,
          password: data.password,
          ownerName: data.fullName.trim(),
          companyName: data.companyName,
          phone,
          state: data.state,
          lga: data.lga || undefined,
          estimatedDogCount: data.estimatedDogCount,
        }
      : {
          firstName,
          lastName,
          email,
          password: data.password,
        };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await res.json().catch(() => ({}))) as {
      message?: string;
      fieldErrors?: AuthFieldErrors;
      emailVerificationRequired?: boolean;
    };
    if (!res.ok) {
      setApiError(body.message ?? "Could not create account.");
      applyFieldErrors(body.fieldErrors, setError);
      return;
    }
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("wafrivet_pending_email", email);
      sessionStorage.setItem("wafrivet_pending_password", data.password);
      if (isSecurityCompany) {
        sessionStorage.setItem("wafrivet_signup_type", "security_company");
      }
    }
    if (body.emailVerificationRequired === false) {
      router.push("/login?verified=1");
      return;
    }
    router.push("/verify");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
          {isSecurityCompany ? "Register your security company" : "Create an account"}
        </h1>
        <p className="text-[15px] text-gray-600 mt-1.5">
          {isSecurityCompany
            ? "Manage your kennel, dogs, and supplies on Wafrivet"
            : "Join Wafrivet — it's free to get started"}
        </p>
      </div>

      {apiError ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </p>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {isSecurityCompany ? (
          <>
            <Field
              label="Company name"
              error={errors.companyName?.message}
              registration={register("companyName")}
              placeholder="e.g. Apex Guard Services"
            />
            <Field
              label="State"
              error={errors.state?.message}
              registration={register("state")}
              placeholder="e.g. Lagos"
            />
            <Field
              label="LGA (optional)"
              error={errors.lga?.message}
              registration={register("lga")}
              placeholder="e.g. Ikeja"
            />
            <Field
              label="Estimated number of dogs"
              type="number"
              error={errors.estimatedDogCount?.message}
              registration={register("estimatedDogCount")}
              placeholder="0"
            />
          </>
        ) : null}

        <Field
          label={isSecurityCompany ? "Owner full name" : "Full Name"}
          error={errors.fullName?.message}
          registration={register("fullName")}
          placeholder="e.g. Emeka Okafor"
        />

        <Field
          label="Phone or email"
          error={errors.emailOrPhone?.message}
          registration={register("emailOrPhone")}
          placeholder="+234 800 000 0000 or you@email.com"
        />

        <Field
          label="Create Password"
          type={showPass ? "text" : "password"}
          error={errors.password?.message}
          registration={register("password")}
          placeholder="Letters and numbers, 8+ characters"
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
          <a
            href={getCentralLoginUrl(returnTo)}
            className="text-[#2D4D31] font-semibold hover:underline"
          >
            Sign in →
          </a>
        </p>
      </form>
    </div>
  );
}
