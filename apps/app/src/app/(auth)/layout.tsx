import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormWrapper } from "@/components/auth/FormAnimations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* ── LEFT PANEL — brand visual ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col">
        <div className="absolute inset-0">
          <Image
            src="/auth-panel-bg.jpg"
            alt="Wafrivet — African herd at golden hour"
            fill
            className="object-cover"
            priority
          />
          {/* gradient: dark at bottom, lighter on top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
        </div>

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link href={process.env.NEXT_PUBLIC_MARKETING_URL || "https://www.wafrivet.com"}>
            <Image src="/logo.svg" alt="Wafrivet" width={280} height={100} className="h-20 w-auto brightness-0 invert" priority />
          </Link>
        </div>

        {/* Quote at bottom */}
        <div className="relative z-10 mt-auto p-10 pb-12">
          <p className="text-white text-[22px] font-light leading-relaxed max-w-[340px]">
            "From a single cow to a thousand&#8209;head ranch — Wafrivet grows with your herd."
          </p>
          <div className="flex items-center gap-2 mt-5">
            <div className="w-5 h-px bg-white/50" />
            <span className="text-white/50 text-sm">Built for Africa's farmers</span>
          </div>
          {/* dot strip */}
          <div className="flex items-center gap-2 mt-8">
            <div className="w-6 h-1.5 bg-white rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-white overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden px-6 pt-8 pb-0">
          <Link href={process.env.NEXT_PUBLIC_MARKETING_URL || "https://www.wafrivet.com"}>
            <Image src="/logo-mark.svg" alt="Wafrivet" width={130} height={44} className="h-10 w-auto" />
          </Link>
        </div>

        {/* Centered form — wrapped in page-entry animation */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-[400px]">
            <FormWrapper>{children}</FormWrapper>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Wafrivet &nbsp;·&nbsp;
            <Link href="#" className="hover:text-gray-600 transition-colors">Privacy</Link>
            &nbsp;·&nbsp;
            <Link href="#" className="hover:text-gray-600 transition-colors">Terms</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
