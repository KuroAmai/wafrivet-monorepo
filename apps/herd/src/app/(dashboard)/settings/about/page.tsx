import { CaretLeft, Globe, GithubLogo, TwitterLogo, ShieldCheck, Info, SealCheck, ShareNetwork, Star } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">About Console</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-10 space-y-12">
        {/* App Identity */}
        <div className="flex flex-col items-center text-center space-y-6">
           <div className="w-24 h-24 bg-white p-5 rounded-[32px] border border-gray-100 shadow-2xl flex items-center justify-center">
              <img src="/logo-mark.svg" alt="Wafrivet" className="w-full h-full object-contain" />
           </div>
           <div>
              <h2 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">Wafrivet Herd</h2>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-1">Console v1.2.4</p>
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <SealCheck size={14} weight="fill" />
              <span className="text-[10px] font-black uppercase tracking-widest">Production Ready</span>
           </div>
        </div>

        {/* Links Group */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
           {[
             { label: "Official Website", icon: Globe, href: "https://wafrivet.com" },
             { label: "Terms of Service", icon: ShieldCheck, href: "#" },
             { label: "Privacy Policy", icon: Info, href: "#" },
             { label: "Rate the App", icon: Star, href: "#" },
             { label: "Share with Peers", icon: ShareNetwork, href: "#" },
           ].map((link, idx) => (
             <a key={idx} href={link.href} target="_blank" className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all group">
                <div className="flex items-center gap-5">
                   <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <link.icon size={20} weight="bold" />
                   </div>
                   <span className="text-[15px] font-black text-gray-900">{link.label}</span>
                </div>
                <CaretLeft size={18} weight="bold" className="text-gray-200 rotate-180 group-hover:text-gray-900 transition-all" />
             </a>
           ))}
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-4">
           <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#2D4D31] hover:border-[#2D4D31]/20 transition-all active:scale-90">
              <TwitterLogo size={24} weight="bold" />
           </button>
           <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#2D4D31] hover:border-[#2D4D31]/20 transition-all active:scale-90">
              <GithubLogo size={24} weight="bold" />
           </button>
        </div>

        {/* Legal / Copyright */}
        <div className="text-center space-y-2">
           <p className="text-[11px] font-bold text-gray-300 leading-relaxed uppercase tracking-widest">
             © 2026 Wafrivet Technologies Ltd.<br />
             All Rights Reserved.
           </p>
           <p className="text-[10px] font-bold text-gray-300">Made with ❤️ for Livestock Professionals</p>
        </div>
      </div>
    </div>
  );
}
